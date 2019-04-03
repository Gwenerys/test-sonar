
$(function() {
    // uncomment one line below to test page in standalone mode, inside I.E.
    //initTooltip() // tooltip popup
	//initCustom(); // simple display dialog box
    //initForm1(); // simple form dialog box
    //initForm1(); // complex form dialog box
    //initDiagnostic(); // simple form dialog box for diagnostic
    //initHelp(); // simple display with Markdown content
	
	// enable tooltips
	//$('.ctx_tooltip').tooltipster();

});

//    Simply call it from: $(function() { ... }
function initCustom() {
	var obj = {
	    message: "###Hello world\nI am a custom dialog<br/>**bla bla bla**<br/><font color='red'>bla bla bla<br/>bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</font><br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla<br/>bla bla bla",
	    iconIcon: "../bmp32/user.png",
	    title: "<img src='../bmp32/user.png'/>  **Custom title**",
	    icon: "../bmp64/comp6.png",
	    autoClose: 10000,
		color: "yellow",
		buttons: {
	        ok: {
		        label: "Ok",
		        type: "warning",
                icon: "check"
	        },
            cancel: {
		        label: "Cancel",
				type: "default",
                icon: "flash"
	        },
	        main: {
		        type: "link",
		        label: "Click ME",
				close: false,
		        icon: "pushpin"
	        }
        }
	};
	initialize(obj);
}

function initTooltip() {
	var obj = {
	    message: "####I am a tooltip \n\n Add extra information below \n\n \
bla bla bla\n\nbla bla bla\n\nbla bla bla\n\nbla bla bla",
	    icon: "../bmp64/galaxy.png",
	    color: "yellow",
	    autoClose: 10000,
		closeOnClick: true,
		classes: {
			'modal-dialog': 'modal-dialog-tooltip',
			'modal-body': 'modal-body-tooltip',
			'icon-class': 'icon-class-tooltip'
		},
		buttons: {}
	};
	initialize(obj);
}

// *** this function is just for testing in standalone mode, inside I.E. ***
//    Simply call it from: $(function() { ... }
function initForm1() {
	var obj = {
	    message: '',
	    header: "<b>Set username and password</b>",
	    color: "blue",
	    form: {
            id: 'inputForm',
	        group: [{
	            label: {
	                value: "Username",
                    width: 3
	            },
                text: {
	                name: "username",
	                width: 5
	            }
	        },
	        {
	            label: {
	                value: "Password",
                    width: 3
	            },
                password: {
                    name: "password",
	                width: 5
	            }
	        },
	        {
    	        row: [{
                    width: 8,
	                label: {
	                    value: "Movie title"
	                },
	                text: {
	                    name: "title"
	                }
                },
                {
                    width: 4,
                    label: {
                        value: "Genre"
                    },
                    select: {
                        name: "genre",
                        options: {
                            action: 'Action',
                            comedy: 'Comedy',
                            horror: 'Horror',
                            romance: 'Romance'
                        }
                    }
                }]
	        },
	        {
    	        row: [{
                    width: 4,
	                label: {
	                    value: "Director"
	                },
	                text: {
	                    name: "director"
	                }
                },
                {
                    width: 4,
                    label: {
                        value: "Writer"
                    },
	                text: {
	                    name: "writer"
	                }
                },
                {
                    width: 4,
                    label: {
                        value: "Producer"
                    },
	                text: {
	                    name: "producer"
	                }
                }]
	        },
	        {
    	        row: [{
                    width: 6,
	                label: {
	                    value: "Website"
	                },
	                text: {
	                    name: "website"
	                }
                },
                {
                    width: 6,
                    label: {
                        value: "Youtube trailer"
                    },
	                text: {
	                    name: "trailer"
	                }
                }]
	        },
	        {
				width:12,
	            label: {
	                value: "Review"
	            },
	            textarea: {
	                name: "review",
	                rows: 8,
	                value: "中华人民共和国大使馆驻法兰\n المملكةالعربيةالسعو  \nФедераПОСО ЛЬСТСИЙСКОЙ $ €"
	            }
	        },
	        {
                width: 12,
	            label: {
	                value: "Rating"
	            },
	            radio: {
	                name: "rating",
	                value: "watchable",
	                className: "radio-inline",
	                options: {
	                    terrible: 'Terrible',
	                    watchable: 'Watchable',
                        best: 'Best ever'
                    }
	            }
	        },
	        {
	            label: {
	                value: "Genre",
	                width: 3
	            },
	            radio: {
	                name: "gender",
	                value: "male",
	                options: {
	                    male: 'Male',
	                    female: 'Female',
	                    other: 'Other'
	                },
	                width: 8
	            }
	        },
	        {
	            label: {
	                value: "Browser",
	                width: 3
	            },
	            checkbox: {
	                name: "browsers[]",
	                value: ["firefox", "ie"],
	                options: {
	                    chrome: 'Google Chrome',
	                    firefox: 'Firefox',
	                    ie: 'IE',
	                    safari: 'Safari',
	                    opera: 'Opera',
	                    other: 'Other'
	                },
	                width: 5
	            }
	        },
	        {
	            label: {
	                value: "Cities",
	                width: 3
	            },
	            text: {
	                name: "cities",
	                value: "Paris",
	                role: "tagsinput",
	                width: 8
	            }
	        },
	        {
	            label: {
	                value: "Countries",
	                width: 3
	            },
	            text: {
	                name: "countries",
	                value: "France",
	                role: "tagsinput",
	                width: 8
	            }
	        },
	        {
	            label: {
	                value: "ID",
	                width: 3
	            },
	            text: {
	                name: "id",
	                value: "2",
	                disabled: "disabled",
	                width: 3
	            }
	        },
	        {
	            label: {
	                value: "Email",
	                width: 3
	            },
	            email: {
	                name: "email",
	                value: "support@contextor.eu",
	                control: "email",
	                width: 5
	            }
	        },
	        {
	            label: {
	                value: "Website",
	                width: 3
	            },
	            text: {
	                name: "website",
	                value: "www.contextor.eu",
	                control: "website",
	                width: 5
	            }
	        }
            /*,{
                row:[{
	                offset: 3,
	                width: 5,
	                button: [{
                        type: 'submit',
				        className: "btn btn-primary",
                        value: "Login",
                        icon: "check"
	                },
	                {
				        className: "btn btn-default",
                        value: "Cancel",
                        icon: "flash"
	                }]
                }]
	        }*/
            ]
        },
		buttons: {
	        Login: {
		        type: "submit",
				className: "btn btn-primary",
                icon: "check"
	        },
            Cancel: {
		        type: "button",
				className: "btn btn-default",
                icon: "flash"
	        }
        }
	};
	initialize(obj);
}

function initForm2() {
	var obj = {
		appliName: 'GLOBAL',
		pageName: 'pBootbox',
		eventName: 'evNotification',
	    message: '',
	    header: "**Set username and password**",
	    form: {
            id: 'inputForm',
	        group: [{
	            label: {
					type: "label",
	                value: "Username",
                    width: 3
	            },
                username: {
					type: "text",
	                width: 5
	            }
	        },
	        {
	            label: {
					type: "label",
	                value: "Password",
                    width: 3
	            },
                password: {
					type: "password",
	                width: 5
	            }
	        },
	        {
	            label: {
					type: "label",
	                value: "Review",
					width: 3
	            },
	            review: {
					type: "textarea",
	                rows: 8,
					width: 8,
	                value: "中华人民共和国大使馆驻法兰\n المملكةالعربيةالسعو  \nФедераПОСО ЛЬСТСИЙСКОЙ $ €"
	            }
	        },
	        {
	            label: {
					type: "label",
	                value: "Cities",
	                width: 3
	            },
	            cities: {
					type: "text",
	                value: "Paris",
	                role: "tagsinput",
	                width: 8
	            }
	        },
	        {
	            label: {
					type: "label",
	                value: "Countries",
	                width: 3
	            },
	            countries: {
					type: "text",
	                value: "France",
	                role: "tagsinput",
	                width: 8
	            }
	        },
	        {
				label: {
					type: "label",
					value: "ID",
					width: 3
				},
				id: {
					type: "text",
					value: "6",
					disabled: "disabled",
					width: 2
				},
				start: {
					type: "button",
					value: "Start",
					className: "btn btn-success",
					tooltip: 'Click to start',
					tooltipPlacement: 'top',
					icon: "check",
					close: false,
					width: 2
				},
				stop: {
					type: "button",
					value: "Stop",
					className: "btn btn-danger",
					tooltip: 'Click to stop',
					tooltipPlacement: 'top',
					icon: "flash",
					close: false,
					width: 2
				}
	        },
	        {
	            label: {
					type: "label",
	                value: "Email",
	                width: 3
	            },
	            email: {
					type: "email",
	                value: "support@contextor.eu",
	                control: "email",
	                width: 5
	            }
	        },
	        {
	            label: {
					type: "label",
	                value: "Website",
	                width: 3
	            },
	            website: {
					type: "text",
	                value: "www.contextor.eu",
	                control: "website",
	                width: 5
	            }
	        }
            /*,{
                row:[{
	                offset: 3,
	                width: 5,
	                button: [{
                        type: 'submit',
				        className: "btn btn-primary",
                        value: "Login",
                        icon: "check"
	                },
	                {
				        className: "btn btn-default",
                        value: "Cancel",
                        icon: "flash"
	                }]
                }]
	        }*/
            ]
        },
		buttons: {
	        login: {
		        type: "submit",
		        value: "Login",
				tooltip: 'Click to submit',
				tooltipPlacement: 'top',
				className: "btn btn-primary",
                icon: "check"
	        },
            cancel: {
		        type: "button",
		        value: "Cancel",
				tooltip: 'Click to cancel',
				tooltipPlacement: 'top',
				className: "btn btn-default",
                icon: "flash"
	        }
        }
	};
	initialize(obj);

}

function initDiagnostic() {
	var obj = {
		appliName: 'GLOBAL',
		pageName: 'pBootbox',
		eventName: 'evNotification',
	    //header: "<b>Issue report</b>",
	    //message: '<b>Bla bla bla...</b><br/>Bla bla bla...<br/><br/>',
	    form: {
            id: 'inputForm',
	        group: [
			{
				row: [{
	                labelDiag: {
						type: "label",
						value: "Diagnostic",
						width: 4,
						tooltip: 'Click to save desktop and Contextor diagnostic'
					}, 
					saveDiag: {
						type: "button",
						submit: true,
						value: "Save",
						icon: "flash",
						tooltip: 'Click to save desktop and Contextor diagnostic',
						width: 8,
						className: "btn-primary"
					}
                }]
			},
			{
				row: [{
	                labelDiag: {
						type: "label",
						value: "Recording",
						width: 4,
					},
	                start: {
						type: "button",
						submit: true,
						value: "Start",
						icon: "play",
						tooltip: 'Click to start recording',
						width: 4,
						className: "btn-success"
					},
	                stop: {
						type: "button",
						submit: true,
						value: "Stop",
						icon: "stop",
						disabled: true,
						visible: false,
						width: 4,
						tooltip: 'Click to stop recording',
						className: "btn-danger"
					}
                }]
			},
			/*{
				label: {
				  value: "",
				  width: 2
				},
				checkbox: {
				  name: "diagOptions[]",
				  value: ["dump"],
				  options: {
					soft: 'Include software list',
					dump: 'Include crash dumps'
				  },
				  width: 9
			    }
	        },*/
			
			
			{
				row: [{
					label: {
					  value: "",
					  width: 4
					},
					checkbox: {
					  name: "recordOptions[]",
					  disabled: true,
					  value: ["screenshot", "auto"],
					  width:8,
					  options: {
						screenshot: 'Include screenshots',
						auto: 'Auto-recording (for each scenario)'
					  }
					}
			
				}]
			},
			{
				row: [{
	                labelComment: {
						type: "label",
						value: "Comment",
						width: 4
					}
                },
				{
	                addComment: {
						type: "button",
						submit: true,
						value: "Add comment",
						icon: "pencil",
						tooltip: 'Click to insert a comment<br/> - bla bla bla<br/> - bla bla bla',
						width: 8,
						className: "btn-primary"
					}
                }]
			},
	        {
	            comment: {
					type: "textarea",
	                rows: 10,
	                value: "",
					tooltipPlacement: 'top',
					width: 12
	            }
	        },
			{    
				close: {
					type: "button",
					value: "Close",
					icon: "check",
					tooltip: 'Click to close Issue report window',
					tooltipPlacement: 'top',
					width: 12,
					close: true,
					className: "btn-default"
				}
			},
            ]
        }
	};
	initialize(obj);
}

function initHelp() {
	var message = "\
<input type=\"hidden\" class=\"rating\" value=\"2\"/>\
<div id='p1' markdown='1' class='step'>\n\
### Markdown text goes in here\n\n\
\n\n\
#### **Format**\n\n\
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\net dolore magna aliqua. \n\n\
</div>\n\
";
	initialize({ message: message });
}

function initMarkdown() {
	/*var options = {
		strikethrough: true,
		tablesHeaderId: true,
		tables: true,
		tasklists: true,
		extensions: ['icon', 'classify']
	}*/
	//var message = document.getElementById("myTextarea").value ;
	var message = "\
<div id='p1' markdown='1' class='step'>\n\
### Markdown text goes in here\n\n\
\n\n\
My text with **markdown** syntax\n\
#### **Format**\n\n\
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <span style=\"font-family:Papyrus; font-size:2em;\">tempor incididunt</span> ut laboreet <span style=\"color:red\">dolore magna</span> aliqua. \n\n\
>Lorem ipsum dolor sit amet\n\n\
>Lorem ipsum dolor sit amet\n\n\
\n\n\
</div>\n\
<div id='p2' markdown='1' class='step'>\n\
*Using Handlebars template*: \n\n\
{{#each people}}\
  * **{{firstname}} {{name}}** is **{{age}}** year old.\n\
{{/each}}\
\n\
<div class='alert alert-success'>\
  <strong>Success!</strong> Indicates a successful or positive action.\
</div>\n\n\
##### Headings *can* also contain **formatting**\n\
</div>\n\
<div id='p2' markdown='1' class='step'>\n\
<div class='row'>\
<div class='col-sm-1' style='background-color:lavender;'>.col-sm-1</div>\
<div class='col-sm-2' style='background-color:lavender;'>.col-sm-2</div>\
<div class='col-sm-5' style='background-color:lavenderblush;'>.col-sm-5</div>\
<div class='col-sm-4' style='background-color:lavender;'>.col-sm-4</div>\
</div>\
<div class='row'>\
<div class='col-sm-4'>\
<div class='btn-group'>\
<a href='#' class='btn btn-primary'>Apple</a>\
<a href='#' class='btn btn-primary'>Samsung</a>\
<a href='#' class='btn btn-primary'>Sony</a>\
</div>\n\n\
#### Glyphicons\n\n\
- @glyphicon-home Home\n\
- @glyphicon-envelope Envelope\n\
- @glyphicon-stop Stop\n\n\n\
</div>\
<div class='col-sm-8'>\n\
#### Task list\n\n\
- [x] This task is done\n\
- [ ] This is still pending\n\n\n\
##### They can even contain `inline code`\n\n\
</div>\
</div>\n\n\
<div class='row'>\
<div class='col-sm-2'><br/>\n\n\
col-sm-2\
</div>\n\
<div class='col-sm-2'>\n\
col-sm-2\
</div>\n\
<div class='col-sm-2'>\n\
col-sm-2\
</div>\n\
<div class='col-sm-2'>\n\
col-sm-2\
</div>\n\
</div>\n\
----\n\n\
</div>\n\
<div id='p3' markdown='1' class='step'>\n\
#### Tables\n\n\
| Tables        | Are           | Cool  |\n\
| ------------- |:-------------:| -----:|\n\
| **col 3 is**  | right-aligned | $1600 |\n\
| col 2 is      | *centered*    |   $12 |\n\
| zebra stripes | ~~are neat~~  |    $1 |\n\n\
----\n\
#### Tooltips\n\n\
<img src=\"../bmp32/user.png\" class=\"ctx_tooltip\" title=\"This is my image's tooltip message!\" />\n\
\n\n\
<span class=\"ctx_tooltip\" title=\"This is my span's tooltip message!\">Some text</span>\n\
\n\n\
<span class=\"ctx_tooltip\" data-tooltipster='{side:\"left\",animation:\"slide\"}' data-tooltip-content=\"#tooltip_content\">This span has a tooltip with HTML when you hover over it!</span>\n\\n\
\n\
<div class=\"tooltip_templates\" style=\"display: none\">\n\
    <span id=\"tooltip_content\">\n\
        <img src=\"../bmp32/user.png\" /> <strong>This is the content of my tooltip!</strong>\n\
    </span>\n\
</div>\n\
\n\
----\n\
#### Images\n\n\
![studio](../bmp64/studio128.png)\n\n\
![comp5](../bmp64/comp5.png)\n\n\
{.thumbnail}![user](../bmp32/user.png)\n\
{.thumbnail}![loader4](../gif/loader4.gif)\n\
----\n\
</div>\n\
<div id='p4' markdown='1' class='step'>\n\
#### Links\n\n\
**markItUp!** is a javascript over [jQuery](http://www.jquery.com \"jQuery Website\") plug-in which allow you to turn any textarea in a markup editor.\n\n\
  * [selfCSS](http://selfcss.org/)\n* [PodloveWebPlayer](http://podlove.org/podlove-web-player/)\n\
  * [Shownot.es](http://shownot.es/)\n* [FAMOUS](http://famous-project.org/)\n\
  * and many more on [github.com](https://github.com/SimonWaldherr?tab=repositories)\n\n\
You can also write down code-examples in markdown:  \n\n\
```\n\
var md   = document.getElementById(\"md\").value;\n  var html = ...\n\
```\n\n\
----\n\
</div>\n\
<div id='p5' markdown='1' class='step'>\n\
#### Bullets\n\n\
1. At vero eos et accusamus et iusto odio dignissimos ducimus\n\
2. Qui blanditiis praesentium voluptatum deleniti atque corrupti\n\
  * Quos dolores et quas molestias excepturi sint\n\
  * Et harum quidem rerum facilis est et expedita distinctio\n\
  1. Neque porro quisquam\n\
  2. est qui dolorem ipsum\n\
  3. quia dolor sit amet\n\
  4. Quis autem vel eum iure reprehenderit\n\
  5. qui in ea voluptate velit esse\n\n\
----\n\
#### HTML content\n\n\
<span style=\"position:absolute;right:25px;\">My *text* on the right</span>\n\
</div>\n\
";

	//var title = "<img src='../bmp32/control_start_blue.png' alt='Previous'/><img src='../bmp32/control_end_blue.png' alt='Next'/>";
	var title;
	var obj = {
	    message: message,
		data: {
			people: [
			{ name: 'Smith', firstname: 'John', age: '26' },
			{ name: 'Wilde', firstname: 'Jack', age: '41'	},
			{ name: 'Smith', firstname: 'Mary', age: '34'	}
			]
		},
	    title: title,
		//size: 'small'
	};
	initialize(obj);

	//$(".step").hide();
	//$("#p5").show();
}

