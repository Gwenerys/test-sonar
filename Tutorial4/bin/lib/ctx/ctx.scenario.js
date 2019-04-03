/**
++++Status: Validated|
<WRAP indent>
|< 100% 10% 10% >|
^ 21/04/2016 ^ ctxt8 ^ Validated ^
</WRAP>
++++
~~NOTOC~~
* ====== Scenario and Step classes ======
* \\
* // :!: __Caution:__ this page is auto-generated from source code and should not be modified from wiki application //
* \\
* \\
* ===== Presentation =====
*
* Scenarios are used to implement complex functionalities, while ensuring safe and maintenable coding.
*
* Scenarios are composed of steps which implement elementary functions.\\
*   * Steps can be mutualized and reused in different scenarios, as far as they implement  clear and well delimited functions.\\
*   * By default, steps are executed sequentially, loops within a set of steps are possible.\\
* \\
* A scenario can have two different states, each state will provide different methods :\\
*   * 'model' or 'template' : the scenario is being declared : there are functions to add steps, declare timeout functions, ...\\
*   * 'instance' or 'running' : the scenario was started and is running : there are functions to end current step, stop scenario, ...\\
*
* \\
* For more details, see [[:pg:orch.scenario|Monitoring complex sequences using Scenarios]].
* \\
*  ====== Scenario and step accessors ======
*/

// *********************************************************
// *** model extension : event subscription / publishing ***
// *********************************************************
var slice = [].slice;

// *********************************************
// *** model extension : Workflow management ***
// *********************************************
/**
 * application constructor class
 * jWorkflow.js
 * (c) 2010 tinyHippos inc.
 * jWorkflow is freely distributable under the terms of the MIT license.
 * Portions of jWorkflow are inspired by Underscore.js
 * @class ctx.jWorkflow
 * @path ctx.jWorkflow
 * @ignore
 * @constructor
 */
ctx.jWorkflow = (function () {
		/** [internal use]
		* Description
		* @ignore
		* @throws {Error}
		* @method _valid
		* @param {function(string,Object)|Array|ctx.jWorkflow} func
		*/
		function _valid(func) {
			if (typeof(func) !== 'function') {
				throw new Error(e.error.InvalidArgument, "expected 'function' but was " + typeof(func));
			}
		}

		/** [internal use]
		* Description
		* @ignore
		* @method _isWorkflow
		* @param {function(string,Object)|Array|ctx.jWorkflow} func
		* @return {boolean} result
		*/
		function _isWorkflow(func) {
			return typeof func.andThen === 'function' &&
			typeof func.start === 'function' &&
			typeof func.chill === 'function';
		}

		/** [internal use]
		* Description
		* @ignore
		* @method _isArray
		* @param {function(string,Object)|Array|ctx.jWorkflow} func
		* @return {boolean} result
		*/
		function _isArray(func) {
			return !!func.map && !!func.reduce;
		}

		var transfunctioner = 
		/** 
		* @lends ctx.jWorkflow
		*/
		{
			/** [internal use]
			* Description
			* @ignore
			* @method order
			* @path ctx.jWorkflow.order
			* @param {function(string,Object)} func
			* @param {ctx.stepClass} [step]
			* @param {ctx.stepClass} [nextStep] optional next step object
			* @param {*} [condition] to launch the step
			* @return {Object} self object
			*/
			order : function (func, step, nextStep, condition) {
				var _workflow = [],
				_tasks = [],
				_transitions = [],
				//_taskIndex = 0,
				_callback = null,
				//_task = null,
				_runningStep = null,
				_baton = (function () {
					var _taken = false;
					return {

						/** [internal use]
						 * Description
						 * @ignore
						 * @method take
						 */
						take : function () {
							_taken = true;
						},

						/** [internal use]
						* Description
						* @ignore
						* @method pass
						* @throws {Error}
						* @param {ctx.stepClass} nextStep
						* @param {*} result
						*/
						pass : function (nextStep, result) {
							_taken = false;
							
							if (nextStep) {
								// transition by mentioning the step to move to
								/** @type {string} */ var nextStepName = ((nextStep instanceof ctx.stepClass) ? nextStep.name : '');
								/** @type {string} */ var appliName = ((nextStep instanceof ctx.stepClass && nextStep.parent) ? nextStep.parent.name : '');
								// *** nextStep mentioned : search in the list ***
								var found = false;
								for ( var index = 0; index < _tasks.length; index++ ) {
									var task = _tasks[index];
									if (task && task.step && (task.step.name == nextStepName) && (task.step.parent.name == appliName)) {
										// move _taskIndex to this value
										//_taskIndex = index;
										_runningStep = task.step;
										found = true;
										break;
									}
								}
								if (!found) {
									if (task && task.step && task.step.sc) { task.step.sc.clear(); }
									throw new Error(e.error.InvalidArgument, 'ctx.scenario: unknown next step \'' + nextStepName + '\'');
								}
							} else {
								// *** search in transition list ***
								var conditionStep = null;
								var noConditionStep = null;
								if ((!_runningStep) && ( _transitions.length == 0)) {
									// there is no transition : it is a single step scenario
									conditionStep = (_tasks[0] ? _tasks[0].step : null); // initialize the workflow with the initial step defined in the task list
								} else {
									for ( var index = 0; index < _transitions.length; index++ ) {
										var transition = _transitions[index];
										if (transition && transition.step) {
											if (!_runningStep) {
												conditionStep = transition.step; // initialize the workflow with the initial step defined in the transition list
												break;
											} else if (transition.step == _runningStep) {
												if (transition.condition) {
													if (transition.condition == result) {
														conditionStep = transition.nextStep;
														break;
													}
												} else {
													noConditionStep = transition.nextStep;
													if (!result) {
														break;
													}
												}
											}
										}
									}
								}
								
								var previousStep = _runningStep;
								if (conditionStep) {
									_runningStep = conditionStep;
								} else if (noConditionStep) {
									_runningStep = noConditionStep;
								} else {
									_runningStep = null; // no more step to execute
								}
							}
							
							if (_runningStep) {
								ctx.notifyState('step', _runningStep.name , _runningStep.id, 'start', '', (_runningStep.sc ? _runningStep.sc.name : ''), (_runningStep.sc ? _runningStep.sc.id : ''), _runningStep.parent);
								ctx.currentParentId = _runningStep.id;
								result = _runningStep.stepFunc.apply(_runningStep, [result, _baton]);

								if (!_taken) {
									_baton.pass(nextStep, result);
								}
							} else {
								if (_callback.func) {
									if (!_callback.step) {
										if (ctx.currentEvent.page) {
											_callback.step = ctx.currentEvent.page;
										} else if (ctx.currentEvent.appli) {
											_callback.step = ctx.currentEvent.appli;
										}
									}
									_callback.func.apply(_callback.step, [result]);
								}
								// scenario is finished : reset states
								if (previousStep && previousStep.sc) {
									//ctx.notifyState('scenario', sc.name, sc.id, 'end');
									previousStep.sc.clear();
									previousStep = null;
								}
								_tasks = [];
							}
						},

						/** [internal use]
						 * Description
						 * @ignore
						 * @method drop
						 * @param {string} result
						 */
						drop : function (result) {
							_taken = true;
							_tasks = [];
							//_taskIndex = 0;
							setTimeout(function () {
								_baton.pass(null, result);
							}, 1);
						},
						/** [internal use]
						 * Description
						 * @ignore
						 * @method clear
						 * @param {string} result
						 */
						clear : function (result) {
							_taken = true;
							_tasks = [];
							//_taskIndex = 0;
						}
					};
				}	()),
				_self = {

					/** [internal use]
					* Description
					* @ignore
					* @method andThen
					* @path ctx.jWorkflow.andThen
					* @param {function(string,Object)|Array|ctx.jWorkflow} func
					* @param {ctx.stepClass} [step]
					* @param {ctx.stepClass} [nextStep] optional next step object
					* @param {*} [condition] to launch the step
					* @return {Object} workflow object
					*/
					andThen : function (func, step, nextStep, condition) {
						if (_isWorkflow(func)) {
							var f = function (prev, baton) {
								baton.take();
								if (typeof func.start === 'function') {
									func.start({
										callback : function (result) {
											baton.pass(null, result);
										},
										/** @type {ctx.stepClass} */ step : step || null,
										initialValue : prev
									});
								}
							};
							_workflow.push({
								func : f,
								/** @type {ctx.stepClass} */ step : step || null
							});
						} else if (_isArray(func)) {
							var orch = function (prev, baton) {
								baton.take();
								var l = func.length,
								join = function () {
									return --l || baton.pass();
								};

								func.forEach(function (f) {
									ctx.jWorkflow.order(f).start(join);
								});
							};
							_workflow.push({
								func : orch,
								step : step
							});
						} else {
							_valid(func);
							if (nextStep) {
								_transitions.push({
									/** @type {ctx.stepClass|undefined} */ step : step,
									/** @type {ctx.stepClass|undefined} */ nextStep : nextStep, 
									condition : condition
								});
							} else {
								var lg = _workflow.length;
								var task = _workflow[_workflow.length - 1];
								if (lg > 0) {
									_transitions.push({
										/** @type {ctx.stepClass|undefined} */ step : task.step,
										/** @type {ctx.stepClass|undefined} */ nextStep : step, 
										condition : undefined
									});
								}
							}
							var found = false;
							ctx.each(_workflow, function(id, value) {
								if (value == step) { found = true; return false; }
							});
							if (!found) {
								_workflow.push({
									func : step.stepFunc,
									/** @type {ctx.stepClass|undefined} */ step : step
								});
							}
							if (nextStep) {
								found = false;
								ctx.each(_workflow, function(id, value) {
									if (value == nextStep) { found = true; return false; }
								});
								if (!found) {
									_workflow.push({
										func : nextStep.stepFunc,
										/** @type {ctx.stepClass|undefined} */ step : nextStep
									});
								}
							}
						}
						return _self;
					},

					/** [internal use]
					 * Description
					 * @ignore
					 * @method chill
					 * @path ctx.jWorkflow.chill
					 * @param {number} time
					 * @return CallExpression
					 */
					chill : function (time) {
						return _self.andThen(function (prev, baton) {
							baton.take();
							setTimeout(function () {
								baton.pass(null, prev);
							}, time);
						});
					},

					/** [internal use]
					 * Description
					 * @ignore
					 * @method start
					 * @path ctx.jWorkflow.start
					 */
					start : function () {
						var callback,
						step,
						initialValue;

						if (arguments[0] && typeof arguments[0] === 'object') {
							callback = arguments[0].callback;
							step = arguments[0].step;
							initialValue = arguments[0].initialValue;
						} else {
							callback = arguments[0];
							step = arguments[1];
						}

						_callback = {
							func : callback,
							step : step
						};
						_tasks = _workflow.slice();
						_runningStep = null;
						_baton.pass(null, initialValue);
					},
					/** [internal use]
					 * Description
					 * @ignore
					 * @method drop
					 * @path ctx.jWorkflow.drop
					 * @param {string} result
					 */
					drop : function (result) {
						_baton.drop(result);
					},
					/** [internal use]
					 * Description
					 * @ignore
					 * @method clear
					 * @path ctx.jWorkflow.clear
					 */
					clear : function () {
						_baton.clear();
					},
					/** [internal use]
					 * Description
					 * @ignore
					 * @method activeStep
					 * @path ctx.jWorkflow.activeStep
					 * @return MemberExpression
					 */
					activeStep : function () {
						return _runningStep;
					}

				};

				return func ? _self.andThen(func, step, nextStep, condition) : _self;
			}
		};
		return transfunctioner;
	})();

/**
* Returns an existing running scenario from its id
* @description
* __Ex.:__
<code javascript>
// get a running scenario by its id, to stop it
ctx.scenario(sc.id).endScenario();
</code>
*
* @method ctx.scenario
* @path ctx.scenario
* @param {number} id scenario id (or id of an existing scenario for a numeric value)
* @return {ctx.scenarioClass} scenario object
*/
ctx.scenario = function (id) {
	/** @type {ctx.scenarioClass} */ var sc = null;
	// retrieve running scenario by its id
	sc = ctx.runningScenarios.map[id];
	return sc;
}

/**
* Declares a new step or retrieves an existing step
* @description
* __Ex.:__
<code javascript>
MyAppli.step({ stGetData: function(ev, sc, st) {
  // Add code here...
  sc.endStep();
}});
</code>
*
* @method ctx.step
* @path ctx.step
* @ignore [internal use]
* @throws {Error}
* @param {string} name step name
* @param {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} [func] step definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
* @param {ctx.application} [parent] parent application
* @param {ctx.stepClass} [nextStep] optional next step object
* @param {*} [condition] to launch the step
* @return {ctx.stepClass} step object
*/
ctx.step = function (name, func, parent, nextStep, condition) {
	parent = parent || GLOBAL;
	name = name || 'stDefault';
	var st = null;
	if (typeof func === "function" ) {
		// if callback is provided, create a new step model
		if (!ctx.currentScenario) {
			// step is declared outside a scenario (global declaration) : store step in application list
	    if ((!parent.steps[name])) {
				parent.steps[name] = st = new ctx.stepClass(name, func, parent);
			} else {
				throw new Error(e.error.DuplicateId, 'ctx.step: name already used: ' + name);
			}
		} else {
			// step is declared inside a scenario (local declaration)
			st = new ctx.stepClass(name, func, parent, ctx.currentScenario);
			ctx.currentScenario.addStep(st, nextStep, condition);
		}
	} else {
		// no callback : step is used in a scenario
		if (!parent.steps[name]) {
			throw new Error(e.error.InvalidArgument, 'ctx.step: unknown name: ' + name);
		}
		else {
			ctx.currentScenario.addStep(parent.steps[name], nextStep, condition);
		}
	}
	return st;
}

/**
* Class to store scenarios
* @class ctx.scenarioManager
* @path ctx.scenarioManager
* @param {ctx.application} parent
* @constructor
* @advanced
*/
ctx.scenarioManager = function (parent) {
	/** class type
	* @ignore
	* @const 
	* @path ctx.scenarioManager.ctxType
	* @property {string} */ this.ctxType = 'ctx.scenarioManager';
	
	/** running scenario map
	* @path ctx.scenarioManager.map
	* @ignore
	* @property {string} */ this.map = {};
	
	/** @type {ctx.application} */ var _parent = parent;
	
/** \\
* ===== Methods =====
*/
	/** [Internal usage]
	* Returns the short description for serialization
	* @ignore
	* @method ctxShort
	* @path ctx.scenarioManager.ctxShort
	*/
	this.ctxShort = function() {
		return undefined; // no serialization
	}

	/**
	* Clears all running scenarios
	* @description
	* __Ex.:__
	* <code javascript>
	* GLOBAL.scenarios.clearAll(  ); 
	* </code>
	* @method clearAll
	* @path ctx.scenarioManager.clearAll
	*/
	this.clearAll = function () {
		ctx.notifyAction('ctx.scenarioManager.clearAll');
		for (var i in ctx.runningScenarios.map) {
			var sc = ctx.runningScenarios.map[i];
			if (_parent) {
				if (_parent == sc.parent)
		    	sc.endScenario();          
			} else {
		    sc.endScenario();          
			}
			ctx.runningScenarios.map[i] = undefined;
			delete ctx.runningScenarios.map[i];
		}
	}

	/**
	* Merges a set of values in the object
	* @description
	* @ignore
	* __Ex.:__
	* <code javascript>
	* GLOBAL.scenarios.set(  ); 
	* </code>
	* @method set
	* @path ctx.scenarioManager.set
	* @param {Object} obj object
	*/
	this.set = function (obj) {
		ctx.notifyAction('ctx.scenarioManager.set');
		ctx.set(obj, this);
	}
};

/** 
* \\
*  ====== Running scenarios ======
*/

/** Running scenario array
* @path ctx.runningScenarios  
* @property {ctx.scenarioManager} ctx.runningScenarios */ ctx.runningScenarios = new ctx.scenarioManager(null);

/**
* Class implementing the scenario object
* @class ctx.scenarioClass
* @path ctx.scenarioClass
* @constructor
* @advanced
* @param {string} name scenario name
* @param {function(ctx.event,ctx.scenarioClass)} func scenario definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ 
* @param {ctx.application} [parent] parent application or process ('GLOBAL' by default)
* @param {boolean} [clone] clone mode (false by default)
* @param {ctx.dataManager} [dataClass] data structure for the scenario
*/
ctx.scenarioClass = function (name, func, parent, clone, dataClass) {
	/** \\
	* ===== Properties ===== */
  /** class type
	* @ignore
	* @const 
	* @path ctx.scenarioClass.ctxType
	* @property {string} */ this.ctxType = 'ctx.scenarioClass';
  
	/** definitions for object copy 
	* @ignore
  * @type {Array.<string>} */ var _copyData = ['endFunc', 'timerFunc', 'errorFunc', 'timerDelay'];
	var _workflow = null;
	var _savedData = {
		/** @type {*} */ input: null,
		/** @type {*} */ output: null
	};
	
	/** @type {function(ctx.event,ctx.scenarioClass)} */ var _func = func || null;
	
	/** @type {ctx.scenarioClass} */ var _scn = this;
  
	/** application instance list
	* @path ctx.scenarioClass.appliInst
	* @advanced
	* @property {Object} */ this.appliInst = {};
  
	/** scenario model or instance
	* @ignore
	* @path ctx.scenarioClass.clone
	* @property {boolean} */ this.clone = clone || false;
  
	/** scenario status
	* @path ctx.scenarioClass.code
	* @property {string} */ this.code = e.error.OK;
  
	/** scenario comment
	* @path ctx.scenarioClass.comment
	* @advanced
	* @property {string} */ this.comment = "";
  
	/** data container model
	* @path ctx.scenarioClass.dataClass
	* @property {ctx.dataManager} */ this.dataClass = this.dataClass || dataClass || null;

	/** data container
	* @path ctx.scenarioClass.data
	* @property {ctx.dataManager} */ this.data = null;
//	if (this.dataClass instanceof ctx.dataManager) 
//		this.data = this.dataClass.create(); // use provided model
//	else
//		this.data = new ctx.dataManager(); // no model provided
//	else if (('function' === typeof this.dataClass) && this.dataClass.prototype && this.dataClass.prototype.constructor) 
//		this.data = new this.dataClass();
//	else if ('function' === typeof this.dataClass) 
//		this.data = this.dataClass();
//	else if ('object' === typeof this.dataClass) 
//		ctx.set(this.dataClass, this.data);
	
	/** scenario ending function
	* @path ctx.scenarioClass.endFunc
	* @advanced
	* @property {function(ctx.scenarioClass)} */ this.endFunc = null;
  
	/** onEnd parent id
	* @path ctx.scenarioClass.onEndParentId
	* @ignore
	* @property {number} */ this.onEndParentId = 0;
  
	/** error handler function
	* @path ctx.scenarioClass.errorFunc
	* @advanced
	* @property {function(ctx.scenarioClass,ctx.stepClass,Object)} */ this.errorFunc = null;
  
	/** scenario exception
	* @path ctx.scenarioClass.exception
	* @property {string} */ this.exception = null;
	
	if (this.clone) {
		/** unique identifier
		* @path ctx.scenarioClass.id
		* @property {number} */ this.id = ctx.objectIndex ++;
	}
  
	/** scenario name
	* @path ctx.scenarioClass.name
	* @property {string} */ this.name = name;
  
	/** parent application
	* @path ctx.scenarioClass.parent
	* @property {ctx.application} */ this.parent = parent || GLOBAL;
  
	/** scenario running state
	* @path ctx.scenarioClass.running
	* @advanced
	* @property {boolean} */ this.running = false;
  
	/** error handler function
	* @path ctx.scenarioClass.runningMode
	* @ignore
	* @property {e.scenario.mode} */ this.runningMode = e.scenario.mode.clearIfRunning;
  
	/** step list
	* @path ctx.scenarioClass.steps
	* @advanced
	* @property {Array.<ctx.stepClass>} */ this.steps = [];
  
	/** timeout delay
	* @path ctx.scenarioClass.timerDelay
	* @advanced
	* @property {number} */ this.timerDelay = 0;
  
	/** timeout handler function
	* @path ctx.scenarioClass.timerFunc
	* @advanced
	* @property {function(ctx.scenarioClass,ctx.stepClass)} */ this.timerFunc = null;
  
	/** \\
	* ===== Methods ===== */
	
  /**
  * Adds a step object in the scenario
	* @description
	* __Ex.:__
<code javascript>
// add a step in scenario
sc.addStep(st);
</code>
  * @method addStep
	* @throws {Error}
	* @ignore
	* @path ctx.scenarioClass.addStep
  * @param {ctx.stepClass} step step object
	* @param {ctx.stepClass} [nextStep] optional next step object
	* @param {*} [condition] to launch the step
  * @return {ctx.stepClass} step object
  */
  this.addStep = function (step, nextStep, condition) {
    if (!(st instanceof ctx.stepClass))
      throw new Error(e.error.InvalidArgument, 'Step not created');
		/** @type {ctx.stepClass} */ var clonedStep = null;
		/** @type {ctx.stepClass} */ var clonedNextStep = null;
		ctx.each(_scn.steps, function(id, value) {
			if (( value instanceof ctx.stepClass) && (value.name == step.name) && (value.parent.name == step.parent.name)) {
				clonedStep = value;
			}
			if (( value instanceof ctx.stepClass) && nextStep && (nextStep instanceof ctx.stepClass) && (value.name == nextStep.name) && (value.parent.name == nextStep.parent.name)) {
				clonedNextStep = value;
			}
		});
		if (!clonedStep) {
			clonedStep = step.cloneStep(this);
			_scn.steps.push(clonedStep);
		}
		if (nextStep && (nextStep instanceof ctx.stepClass) && (!clonedNextStep)) {
			clonedNextStep = nextStep.cloneStep(this);
			_scn.steps.push(clonedNextStep);
		}
		ctx.notifyState('step', clonedStep.name , clonedStep.id, 'add', '', (clonedStep.sc ? clonedStep.sc.name : ''), (clonedStep.sc ? clonedStep.sc.id : -1), clonedStep.parent);								

    if (_workflow) {
      _workflow.andThen(clonedStep.stepFunc, clonedStep, clonedNextStep, condition);
    } else {
      _workflow = ctx.jWorkflow.order(clonedStep.stepFunc, clonedStep, clonedNextStep, condition);
    }
    return clonedStep;
	}

  /** [Internal usage]
  * Gets internal baton object
  * @method baton
  * @ignore
	* @protected
	* @path ctx.scenarioClass.baton
  * @return {Object} baton object
  */
  this.baton = function () {
    if (_workflow)
      return _workflow.baton;
    else
      return null;
  }

  /**
  * Clears an existing scenario 
	* Internal usage only : use ctx.scenarioClass.endScenario()
	* @description
	* __Ex.:__
<code javascript>
sc.clear();
</code>
  * @method clear
	* @ignore
	* @protected
	* @path ctx.scenarioClass.clear
	* @param {boolean} [init] initial or end clear
  * @return {ctx.scenarioClass} scenario object
  */
  this.clear = function (init) {
		if (this.steps.length) {
			this.steps = []; // reset step list
		}
		this.running = false;
		ctx.runningScenarios.map[this.id] = undefined;
		delete ctx.runningScenarios.map[this.id];
		if (_workflow) {
			_workflow.clear();
			_workflow = null;
		}
		if (init) {
			// copy initial data
			_savedData.input = ctx.set(this.data, {});
		} else {
			if (_savedData.input) {
				_savedData.code = this.code;
				_savedData.output = this.data;
				ctx.notifyState('scenario', this.name, this.id, 'end', _savedData, '', ctx.currentParentId, this.parent);
				_savedData.input = null;
				_savedData.output = null;
			}

			if (this.endFunc && (typeof this.endFunc === 'function')) {
				// restore parent Id
				var id = ctx.objectIndex++;
				ctx.notifyState('onEnd', this.name, id, 'run', '', '', this.onEndParentId, this.parent);
				// call end callback
				this.endFunc(this);
			}
			
			if (ctx.options.trace.autoRecordingStarted) {
				if (ctx.isEmpty(ctx.runningScenarios.map)) {
					// stop auto recording if there is no more running scenario
					// - si scenario failed : archive folder trace
					// - si scenario succeeded : delete folder trace
					var isOK = (ctx.options.trace.autoRecordingCode == e.error.OK)
					if ((!isOK) && ctx.diagnostic && ctx.diagnostic.saveAll) {
						// before stopping recording, generate a light diagnostic
						ctx.diagnostic.saveAll(false);
					}					
					ctx.reinitTraceFolder(true, false, true, isOK);
					ctx.options.trace.autoRecordingStarted = false;
					ctx.options.trace.autoRecordingCode = e.error.OK;
				}
			}
		}
		return this;
  }
	
	if (!this.clone)
	{
		// *******************************
		// *** Scenario model : static ***
		// *******************************
	  /** 
	  * Clones a given scenario
		* @description
		* __Ex.:__
<code javascript>
var sc2 = sc.cloneScenario();
</code>
	  * @ignore [Internal usage]
	  * @method cloneScenario
	  * @path ctx.scenarioClass.cloneScenario
	  * @return {ctx.scenarioClass} cloned scenario
	  */
	  this.cloneScenario = function () {
	    var sc = new ctx.scenarioClass(this.name, _func, this.parent, true, this.dataClass); // create new
			// copy data
	    for (var i = 0; i < _copyData.length; i++) {
		    var id = _copyData[i];
		    if (this[id]) { sc[id] = this[id]; }			
			}
			sc.id = ctx.objectIndex++;
	    return sc;
	  }
  }
	
	/** [Internal usage]
	* Returns the short description for serialization
	* @ignore
	* @method ctxShort
	* @path ctx.scenarioClass.ctxShort
	*/
	this.ctxShort = function() {
		var att = ['id', 'name', 'data', 'code', 'exception'];
		var obj = {};
		var self = this;
		ctx.each(att, function(id, value) {
			obj[value] = self[value];
		});
		obj.parent = this.parent.name;
		return obj;
	}

	if (this.clone)
	{
	  /**
	  * Stops and clears an existing scenario 
		* @description
		* __Ex.:__
<code javascript>
// start scenario, memorize scenario object in application data
MyAppli.data.MyScenario = MyAppli.scenarios.MyScenario.start();
...
MyAppli.data.MyScenario.endScenario();
</code>
	  * @method endScenario
		* @path ctx.scenarioClass.endScenario
	  * @return {ctx.scenarioClass} scenario object
	  */
	  this.endScenario = function () {
			if (_workflow) {
		    var st = _workflow.activeStep();
		    if (st) {
		      st.endStep(null, true);
		    }
			}
			this.clear();
			return this;
	  }
  }
	
	if (this.clone)
	{
	  /**
	  * Ends the current step in the running scenario, and starts the next step
		* @description
		* __Ex.:__
<code javascript>
MyAppli.step({stGetData: function(ev, sc, st) {
  // start MyAppli page if needed
  MyAppli.MyPage.start();
  MyAppli.MyPage.wait(function(ev) {
    ...
    // step done
    sc.endStep();
  });
}});
</code>
	  * @method endStep
		* @path ctx.scenarioClass.endStep
	  * @param {ctx.stepClass|*} [result] result code, or next step to move to : if omitted, the next step in the chain is started.\\ If mentioned, the mentioned step is executed
	  * @return {ctx.scenarioClass} scenario object
	  */
	  this.endStep = function (result) {
	    var st = null;
	    if (_workflow) 
				st = _workflow.activeStep();
	    if (st) {
	      st.endStep(result);
	    }
			return this;
	  }
  }
	
  /** Checks if an instance of the scenario is running [Internal usage]
	* @description
	* __Ex.:__
<code javascript>
if (MyAppli.scenarios.MyScenario.isRunning()) { 
  ... 
}
</code>
  * @method isRunning
  * @path ctx.scenarioClass.isRunning
  * @return {boolean} true if a scenario instance is running
  */
  this.isRunning = function () {
		var res = false;
		if (this.clone) {
			// running instance
			res = this.running;
		} else {
			// static model : check if there is a running scenario with the same name and parent
			for (var i in ctx.runningScenarios.map) {
				var sc = ctx.runningScenarios.map[i];
				if ((this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
			    res = true;          
					break;
				}
			}
		}
    return res;
  }
	
	if (this.clone)
	{
		/** 
	  * Declares a callback called when the scenario is ended
		* @description
		* __Ex.:__
<code javascript>
var sc = MyAppli.scenarios.MyScenario.start().onEnd(function() {
  // function called when the scenario is ended...
});	
</code>
		* 
		* <WRAP tip>You can use 'snippets' to accelerate development :
		*   * **sc.onEnd** + 'TAB' :
		* 
<code javascript>
sc.onEnd( function() { 
  
});
</code>
		* </WRAP>
		* @method onEnd
		* @path ctx.scenarioClass.onEnd
		* @param {function(ctx.scenarioClass)} func callback called when the scenario is ended\\ - //{ctx.scenarioClass}// **sc** : the scenario object
		* @return {ctx.scenarioClass} scenario object
	  */
	  this.onEnd = function (func) {
			this.onEndParentId = ctx.currentParentId;
			this.endFunc = func;
	    return this;
	  }
  }
	
	if (this.clone)
	{
		/**
		* Declares a default error handler on a scenario
		* @description
		* This error handler is used by default on any step in the scenario
		*
		* __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default error handler
  sc.onError(function (sc, st, ex) { sc.endScenario(); });
  ...
}});
</code>
		* 
		* <WRAP tip>You can use 'snippets' to accelerate development :
		*   * **sc.onError** + 'TAB' :
		* 
<code javascript>
sc.onError( function(sc, st, ex) { 
  sc.endScenario();
  ...
});
</code>
		* </WRAP>
		* @method onError
		* @path ctx.scenarioClass.onError
		* @param {function(ctx.scenarioClass,ctx.stepClass,Object)} func error definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object\\ - //{Object}// **ex** : the exception object
	  * @return {ctx.scenarioClass} scenario object
		*/
		this.onError = function (func) {
			this.errorFunc = func;
			return this;
		}
  }
	
	if (this.clone)
	{
		/**
		* Declares a default timeout handler on a scenario
		* @description
		* This timeout handler is used by default on any step in the scenario
		*
		* __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default timeout handler
  sc.onTimeout(5000, function (sc, st) { sc.endScenario(); });
  ...
}});
</code>
		* 
		* <WRAP tip>You can use 'snippets' to accelerate development :
		*   * **sc.onTimeout** + 'TAB' :
		* 
<code javascript>
sc.onTimeout( 30000, function(sc, st) { 
  sc.endScenario();
  ...
});
</code>
		* </WRAP>
		* @method onTimeout
		* @path ctx.scenarioClass.onTimeout
		* @param {number} delay timeout delay (in ms)
		* @param {function(ctx.scenarioClass,ctx.stepClass)} func timeout definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
		* @return {ctx.scenarioClass} scenario object
		*/
		this.onTimeout = function (delay, func) {
			this.timerFunc = func;
			this.timerDelay = delay;
			return this;
		}
  }
	
	/** [internal use]
  * Description
  * @ignore
  * @method scFunc
	* @path ctx.scenarioClass.scFunc
	* @param {function(ctx.event,ctx.scenarioClass)} [func] scenario callback
  * @return _func
  */
  this.scFunc = function (func) {
		if (func) _func = func;
    return _func;
  }
	
	if (this.clone)
	{
		/** 
	  * Memorizes the default instance for the application
		* @description
		* __Ex.:__
<code javascript>
Amazon.step({ stStart: function(ev, sc, st) {
  // force page launch
  Amazon.pHome.start(undefined, undefined, undefined, undefined, true);
  Amazon.events.START.on(function(ev) {
    if (sc.setDefaultInst(ev))
      sc.endStep();
  });
}});	
</code>
	  * @method setDefaultInst
		* @path ctx.scenarioClass.setDefaultInst
	  * @param {ctx.application|ctx.event} obj application or event object 
	  * @return {boolean} return true if instance was memorized
	  */
	  this.setDefaultInst = function (obj) {
			var res = false;
			if (obj && (obj instanceof ctx.event)) {
				//if ((obj.appliInst > 0) && (!this.appliInst[obj.appliName])) {
				if (obj.appliInst > 0) {
					this.appliInst[obj.appliName] = obj.appliInst;
					res = true;
				}
			} else if (obj && (obj instanceof ctx.application)) {
				//if ((obj.instance > 0) && (!this.appliInst[obj.name])) {
				if (obj.instance > 0) {
					this.appliInst[obj.name] = obj.instance;
					res = true;
				}
			}
	    return res;
	  }
  }
	
	if (this.clone)
	{
		/**
		* Declares the start mode on a scenario
		* @description
		* The start mode is used to define the behavior when the scenario is started.
		*
		* __Ex.:__
		*  * if a scenario with the same name is running, it is cancelled
		*  * if a scenario with the same name is running, the new scenario is not started
		*  * all running scenarios are cancelled
		*  * ...
		*
		* __Ex.:__
<code javascript>
MyAppli.scenario({ MyScenario: function(ev, sc) {
  // default error handler
  sc.setMode(e.scenario.mode.noStartIfRunning);
  ...
}});
</code>
		* @method setMode
		* @path ctx.scenarioClass.setMode
		* @param {e.scenario.mode} mode start mode (see '[[lib:common:ctx.enum#escenariomode|e.scenario.mode]]' for more details)		
		
	  * @return {ctx.scenarioClass} scenario object
		*/
		this.setMode = function (mode) {
			this.runningMode = mode;
			return this;
		}
  }
	
	if (!this.clone)
	{
	  /**
	  * Starts an existing scenario
		* @description
		* __Ex.:__
<code javascript>
// declare scenario
MyAppli.scenario({ scCRMGetData: function(ev, sc) { ... }});
...
// start scenario
var data = { ... }; // input data
var sc = MyAppli.scenarios.scCRMGetData.start( data );
</code>
	  * @method start
		* @path ctx.scenarioClass.start
	  * @param {Object} [data] initialization data
	  * @return {ctx.scenarioClass} scenario object
	  */
	  this.start = function (data) {
			// never instanciate the model, create a clone
			/** @type {ctx.scenarioClass} */ var sc = this.cloneScenario();
			var parentId = ctx.currentParentId;
			// differed start
			ctx.addPendingFunction(function () { 
				ctx.currentParentId = parentId;
				sc.startClone(data);
			});
			
//			// asynchronous start
//			setTimeout(function () {
//				ctx.currentParentId = parentId;
//				sc.startClone(data);			
//			}, 1);
			return sc;			
	  }
		/** alias used for Intellisense
		* @method $start
		* @path ctx.scenarioClass.$start
		* @ignore
		*/
		this.$start = sc;
  }
	
	if (this.clone)
	{
		// ****************************
		// *** Clone mode : running ***
		// ****************************
	  /**
	  * Starts an existing cloned scenario
		* @description
		* __Ex.:__
<code javascript>
var sc = this.cloneScenario();
sc.startClone(data);			
</code>
		*
	  * @method startClone
		* @ignore
		* @path ctx.scenarioClass.startClone
	  * @param {Object} [data] initialization data
	  * @return {ctx.scenarioClass} scenario object
	  */
	  this.startClone = function (data) {
			if (!ctx.counters.scenarios[this.parent.name]) ctx.counters.scenarios[this.parent.name] = {};
			if (ctx.counters.scenarios[this.parent.name][this.name]) 
				ctx.counters.scenarios[this.parent.name][this.name] ++; 
			else 
				ctx.counters.scenarios[this.parent.name][this.name] = 1;		
			
			// set initial data
			if ((data instanceof ctx.dataManager) && (this.dataClass instanceof ctx.dataManager) && (data.getCtxName() == this.dataClass.getCtxName())) {
				// don't make a copy, get a reference
				this.data = data;
			} else {
				// create a data structure, copy input data
				if (this.dataClass instanceof ctx.dataManager) {
					this.data = this.dataClass.create(); // use provided model
				} else {
					this.data = new ctx.dataManager(); // no model provided, create an empty dataManager
				}
				if (data && (typeof data === 'object')) { 
					this.data.set(data);
				}
			}
			
	    this.clear(true); // reset existing state

			var obj = {
	      callback: null,
	      step: null,
	      initialValue: null
	    };

			// Memorize as running scenario
			this.running = true;
			ctx.runningScenarios.map[this.id] = this;
			
			// activate autorecording mode
			if ((ctx.options.trace.autoRecording) && (!ctx.options.trace.autoRecordingStarted)) {
				ctx.reinitTraceFolder(false, true, true);
				ctx.options.trace.autoRecordingCode = e.error.OK;
				ctx.options.trace.autoRecordingStarted = true;
				// force current event generation
				var lastEvent = ((ctx.currentEvent && ctx.currentEvent.parent) ? ctx.currentEvent : ctx.lastEvent);
				ctx.notifyEvent(lastEvent, true);
			}
			
			// Lock the default instance to use for this scenario
			var parent = this.parent;
			var desc = this.parent.getObjectDescriptor();
			if (desc.appli && desc.appli.instance > 0) {
				parent = desc.appli;
				this.setDefaultInst(parent);
			}
			
			ctx.notifyState('scenario', this.name, this.id, 'start', parent, '', ctx.currentParentId, this.parent);

			if (_func) {
				ctx.currentScenario = this;
				var oldParentId = ctx.currentParentId;
				ctx.currentParentId = this.id;
	      _func.apply(this.parent, [ctx.currentEvent, this]);
				ctx.currentParentId = oldParentId;
	    }
	
			// Check running mode
			switch (this.runningMode) {
				case e.scenario.mode.noStartIfRunning:
				{
					// don't launch if a scenario with same name and parent is running
					for (var i in ctx.runningScenarios.map) {
						var sc = ctx.runningScenarios.map[i];
						if ((sc != this) && (this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
					    this.endScenario();          
					    return sc;          
						}
					}
					break;
				}
				case e.scenario.mode.clearIfRunning:
				{
					// clear if a scenario with same name and parent is running
					for (var i in ctx.runningScenarios.map) {
						var sc = ctx.runningScenarios.map[i];
						if ((sc != this) && (this.name == sc.name) && (this.parent == sc.parent) && sc.running) {
					    sc.endScenario();          
						}
					}
					break;
				}
				case e.scenario.mode.clearAll:
				{
					// clear all running scenarios except this one
					for (var i in ctx.runningScenarios.map) {
						var sc = ctx.runningScenarios.map[i];
				    if ((sc != this) && sc.running)
							sc.endScenario();          
					}
					break;
				}
				case e.scenario.mode.noControl:
				default:
				{
					// nothing to do...
					break;
				}
			}

	    if (_workflow) {
	      _workflow.start(obj);
			}
			return this;
	  }
  }
	
	if (this.clone)
	{
		/**
	  * Adds a new step in the scenario
		* @description
		* __Ex.:__
	<code javascript>
	// declare scenario
	MyAppli.scenario({MyScenario: function(ev, sc) {
	  // add steps in scenario
	  sc.step(MyAppli.steps.stGetData);
	  ...
	}});
	</code>
	  * @method step
		* @path ctx.scenarioClass.step
		* @throws {Error}
		* @param {number|ctx.stepClass} st step object (or id of an existing step in the scenario for a numeric value)
		* @param {ctx.stepClass} [nextStep] optional next step object
		* @param {*} [condition] to launch the step
	  * @return {ctx.stepClass} step
	  */
	  this.step = function (st, nextStep, condition) {
			// 'st' is a a step object or an id
	    /** @type {ctx.stepClass} */ var step = null;
		  if (typeof st === 'number') {
				// retrieve existing step by its id
				for (var i = 0; i < this.steps.length; i ++)
				{ 
					step = this.steps[i];
					if (step.id == st) 
						return step;
				}
			}  else if (st instanceof ctx.stepClass) {
				step = _scn.addStep(st, nextStep, condition);
			} else
	      throw new Error(e.error.InvalidArgument, "ctx.scenario.step : invalid step object");
	    return step;
	  }
	}

	return this;
}

/**
* Class implementing the step object
* @class ctx.stepClass
* @path ctx.stepClass
* @constructor
* @advanced
* @param {string} name step name
* @param {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} func step definition function\\ - //{ctx.event}// **ev** : the current event\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
* @param {ctx.application} [parent] parent application
* @param {ctx.scenarioClass} [sc] parent scenario
*/
ctx.stepClass = function (name, func, parent, sc) {
	/** \\
	* ===== Properties ===== */
	
	/** class type
	* @ignore
	* @const 
	* @path ctx.stepClass.ctxType
	* @property {string} */ this.ctxType = 'ctx.stepClass';
	
  var _copyData = ['timerFunc', 'errorFunc', 'timerDelay'];
	
  /** @type {ctx.stepClass} */ var _step = this;
	
	/** @type {function(ctx.event,ctx.scenarioClass,ctx.stepClass)} */ var _func = func || null;
  
	/** baton object
	* @ignore
	* @path ctx.stepClass.baton
	* @property {number} baton  */ this.baton = null;
	
	/** step comment
	* @path ctx.stepClass.comment
	* @advanced
	* @property {string} */ this.comment = "";
  
	/** error handler function
	* @path ctx.stepClass.errorFunc
	* @ignore
	* @property {function(ctx.scenarioClass,ctx.stepClass,Object)} errorFunc  */ this.errorFunc = null;
  
	/** unique identifier
	* @path ctx.stepClass.id
	* @property {number} id  */ this.id = ctx.objectIndex ++;
	
	/** step name
	* @path ctx.stepClass.name
	* @property {string} */ this.name = name;
  
	/** parent application
	* @path ctx.stepClass.parent
	* @property {ctx.application} */ this.parent = parent || GLOBAL;
  
	/** previous step return value
	* @path ctx.stepClass.previousResult
	* @ignore
	* @property {string} */ this.previousResult = null;
	
	/** running state
	* @path ctx.stepClass.running
	* @property {boolean} running  */ this.running = false;

	/** parent scenario
	* @ignore
	* @path ctx.stepClass.sc
	* @property {ctx.scenarioClass} sc */ this.sc = sc || null;
  
	/** timeout delay
	* @path ctx.stepClass.timerDelay
	* @ignore
	* @property {number} timerDelay  */ this.timerDelay = 0;
  
	/** step timer index
	* @path ctx.stepClass.timerIndex
	* @ignore
	* @property {number} */ this.timerIndex = 0;
  
	/** step timer object
	* @path ctx.stepClass.timerObj
	* @ignore
	* @property {number} */ this.timerObj = null;

	/** step timer list
	* @path ctx.stepClass.timers
	* @ignore
	* @property {Object} */ this.timers = {};	
  
	/** timeout handler function
	* @path ctx.stepClass.timerFunc
	* @ignore
	* @property {function(ctx.scenarioClass,ctx.stepClass)} timerFunc  */ this.timerFunc = null;
  
	/** \\
	* ===== Methods ===== */

	/** [Internal usage]
	 * Function calling the step callback, protected by a try / catch to handle error if an 'errorFunction' was set
	 * @ignore
	 * @method callFunction
	 * @path ctx.stepClass.callFunction
	 * @param {Function} func
	 * @param {Object} context
	 * @param {Object} [args]
	 * @return {*} 'func' return value
	 */
	this.callFunction = function (func, context, args) {
		var ret;
		var bError = false;
		ctx.currentStep = this;
		this.running = true;
		var st = this;
		if ((this.errorFunc) || (this.sc.errorFunc)) { 
			try{
				ret = func.apply(context, args);
			} catch (ex) {
				ctx.log(this, e.logIconType.Error, 'Step ' + st.sc.parent.name + '.' + st.sc.name + '[' + st.sc.id + '].' + st.name + '[' + st.id + ']: ' + ex.name + ': ' + ex.message );
				ctx.options.trace.autoRecordingCode = this.sc.code = e.error.KO;
				this.sc.exception = ex;
				if (bError) {
						ret = this.sc.endScenario();
				} else {
					bError = true; // avoid loop in error : if second error, endScenario
					if (this.errorFunc)
						ret = this.errorFunc(this.sc, this, ex);
					else if (this.sc.errorFunc)
						ret = this.sc.errorFunc(this.sc, this, ex);
					else
						ret = this.sc.endScenario();
				}
			}
		} else {
			ret = func.apply(context, args);
		}
		//this.running = false;
		//ctx.currentStep = null;
		return ret;
	}	
	
	/** [Internal usage]
  * Clones a given step
	* @description
	* __Ex.:__
<code javascript>
var st2 = st.cloneStep(sc);
</code>
  * @ignore
  * @method cloneStep
  * @path ctx.stepClass.cloneStep
  * @param {ctx.scenarioClass} sc parent scenario
  * @return {ctx.stepClass} cloned step
  */
  this.cloneStep = function (sc) {
		/** @type {ctx.stepClass} */ var st = new ctx.stepClass(this.name, _func, this.parent, sc);
    for (var i = 0; i < _copyData.length; i++) {
	    var id = _copyData[i];
	    if (this[id]) { st[id] = this[id]; }			
		}
		st.id = ctx.objectIndex++;
    return st;
  }
	
	/** [Internal usage]
	 * Returns the short description for serialization
	 * @ignore
	 * @method ctxShort
	 * @path ctx.stepClass.ctxShort
	 */
	this.ctxShort = function() {
		var att = ['id', 'name', 'parent', 'sc'];
		var obj = {};
		var self = this;
		ctx.each(att, function(id, value) {
			obj[value] = self[value];
		});
		return obj;
	}
	
	/**
	* Disables the default timeout handler on a step
	* @description
	* If a timeout handler is declared by default on the parent scenario, the step handler overrides the default behavior
	*
	* __Ex.:__
<code javascript>
MyAppli.step({ stCRMStart: function(ev, sc, st) {
  // disable timeout handler for this step
  st.disableTimeout();
  ...
}});
</code>
	* @method disableTimeout
	* @path ctx.stepClass.disableTimeout
	*/
	this.disableTimeout = function () {
		this.onTimeout(1000);
	}

	/**
  * Ends the current step in the running scenario, and starts and the next step
	* @description
	* __Note:__ : endStep() can be called indifferently on the scenario or step object : ''st.endStep();'' equivalent to ''sc.endStep();''
	*
	* __Ex.:__
<code javascript>
MyAppli.step({ MyStep: function(ev, sc, st) {
  // start MyAppli page if needed
  MyAppli.MyPage.start();
  MyAppli.MyPage.wait(function(ev) {
    ...
    // step done
    st.endStep(); // equivalent to 'sc.endStep();'
  });
}});
</code>
	* @method endStep
	* @path ctx.stepClass.endStep
  * @param {ctx.stepClass|*} [result] result code, or next step to move to : if omitted, the next step in the chain is started.\\ If mentioned, the mentioned step is executed
	* @param {boolean} [bNoPass] if 'true', next step is not called
	*/
	this.endStep = function (result, bNoPass) {
		var step = this;
		ctx.addPendingFunction(function () { 
			step.running = false;
			if (step.timerObj) {
				clearTimeout(step.timerObj);
				ctx.notifyState('once', 'timer' + step.timerIndex, step.timerIndex, 'reset', '', '', ctx.currentParentId);								
				step.timerObj = null;
				step.timerIndex = 0;
			}		
			// unsubscribe all handlers for this step
			ctx.amplify.unsubscribeStep(step);
			
			ctx.notifyState('step', step.name , step.id, 'end', '', '', ctx.currentParentId, step.parent);		
			//ctx.notifyState('step', step.name , step.id, 'end', '', (step.sc ? step.sc.name : ''), (step.sc ? step.sc.id : -1), step.parent);	
			
			if (ctx.currentStep == step.running)
				ctx.currentStep = null;
			if ((ctx.currentParentId == step.id) && ctx.currentSubscription)
				ctx.currentParentId = ctx.currentSubscription.id;
			
			// move to next step 
			if (step.baton && !bNoPass) {
		    if (result instanceof ctx.stepClass)
					_step.baton.pass(result); 
				else
					_step.baton.pass(undefined, result); 
			}
		});
	}
	
	/**
	* Declares an error handler on a step
	* @description
	* If an error handler is declared by default on the parent scenario, the step handler overrides the default behavior
	*
	* __Ex.:__
<code javascript>
MyAppli.step({ stStart: function(ev, sc, st) {
  // error handler for this step
  st.onError(function (sc, st, ex) { ... });
  ...
}});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **st.onError** + 'TAB' :
	* 
<code javascript>
st.onError(function(sc, st, ex) { 
  sc.endScenario();
  ...
});
</code>
	* </WRAP>
	* @method onError
	* @path ctx.stepClass.onError
	* @param {function(ctx.scenarioClass,ctx.stepClass,Object)} func error definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object\\ - //{Object}// **ex** : the exception object
	*/
	this.onError = function (func) {
		this.errorFunc = func;
	}
	
	/**
	* Declares a timeout handler on a step
	* @description
	* If a timeout handler is declared by default on the parent scenario, the step handler overrides the default behavior
	*
	* __Ex.:__
<code javascript>
MyAppli.step({ stStart: function(ev, sc, st) {
  // timeout handler for this step
  st.onTimeout(5000, function (sc, st) { ... });
  ...
}});
</code>
	* 
	* <WRAP tip>You can use 'snippets' to accelerate development :
	*   * **st.onTimeout** + 'TAB' :
	* 
<code javascript>
st.onTimeout( 30000, function(sc, st) { 
  sc.endScenario();
  ...
});
</code>
	* </WRAP>
	* @method onTimeout
	* @path ctx.stepClass.onTimeout
	* @param {number} delay timeout delay (in ms)
	* @param {function(ctx.scenarioClass,ctx.stepClass)} [func] timeout definition function\\ - //{ctx.scenarioClass}// **sc** : the scenario object\\ - //{ctx.stepClass}// **st** : the step object
	*/
	this.onTimeout = function (delay, func) {
		this.timerFunc = func;
		this.timerDelay = delay;
		if (this.running) {
			var _step = this;
			// clear potential running timer
			if (_step.timerObj) {
				clearTimeout(_step.timerObj);
				_step.timerObj = null;
			}
			// the step is currently running : start timer now
			if ((_step.timerFunc) && (_step.timerDelay)) {
				_step.timerObj = setTimeout( function() { _step.timerFunc(_step.sc, _step); }, _step.timerDelay);
			} 
		}
	}
	
	/** [Internal usage]
	 * Main step function
	 * @ignore
	 * @method stepFunc
	 * @path ctx.stepClass.stepFunc
	 * @param {string} previous
	 * @param {Object} baton
	 */
	this.stepFunc = function (previous, baton) {
		this.baton = baton;
		if (_func && _step) {
			this.baton.take();
			_step.previousResult = previous;
			var timerFunc, timerDelay;
			if ((_step.timerFunc) && (_step.timerDelay)) {
				// set a step timeout handler
				timerFunc = _step.timerFunc;
				timerDelay = _step.timerDelay;
			} else if ((_step.sc.timerFunc) && (_step.sc.timerDelay)) {
				// set the scenario timeout handler
				timerFunc = _step.sc.timerFunc;
				timerDelay = _step.sc.timerDelay;
			}	
			if (timerFunc && timerDelay && (!ctx.options.timeoutDisabled)) {
				_step.timerIndex = ctx.objectIndex++;
				// PLO - Nomme le Timer pour clarifier au niveau du Debugger
				//var strTimeoutName = 'timer' + _step.timerIndex
				var strTimeoutName = 'timeout(' + _step.name + ')' ;
				ctx.notifyState('once', strTimeoutName, _step.timerIndex, 'set', '', _step.name, _step.id);								
				_step.timerObj = setTimeout( function(st, timerFunc) { return function() { 
					ctx.notifyState('once', strTimeoutName, st.timerIndex, 'run', '', st.name, st.id);								
					ctx.options.trace.autoRecordingCode = st.sc.code = e.error.TimeOut;
					var prevParentId = ctx.currentParentId;
					ctx.currentParentId = st.timerIndex;
					ctx.log(st, e.logIconType.Error, 'Step ' + st.sc.parent.name + '.' + st.sc.name + '[' + st.sc.id + '].' + st.name + '[' + st.id + ']: timeout'  );
					timerFunc(st.sc, st); 
					ctx.currentParentId = prevParentId;
					ctx.notifyState('once', strTimeoutName, st.timerIndex, 'reset', '', st.name, st.id);								
				}; }(_step, timerFunc), timerDelay);
			}
			
			this.callFunction(_func, this, [ctx.currentEvent, this.sc, this]);
		}
	}


	  /**
	  * Starts an existing step
		* @description
		* __Ex.:__
<code javascript>
// declare scenario
MyAppli.step({ stCRMGetData: function(ev, sc) { ... }});
...
// start scenario
var data = { ... }; // input data
var sc = MyAppli.steps.stCRMGetData.start( data );
</code>
	  * @method start
		* @path ctx.stepClass.start
	  * @param {Object} [data] initialization data
	  * @return {ctx.scenarioClass} scenario object
	  */
	  this.start = function (data) {
			var obj = {};
			var step = this;
			// create new scenario (with step name)
			obj[step.name] = function(ev, sc) { 
				// no onTimeout management, default onError and mode management
				sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
				sc.setMode(e.scenario.mode.clearIfRunning);
				sc.step(step);
			}
			var sc = this.parent.scenario(obj);
			return sc.start();			
	  }

	return this;
};

