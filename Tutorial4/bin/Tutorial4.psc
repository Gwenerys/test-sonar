<?xml version="1.0" encoding="utf-8"?>
<ConteXtorStudio Version="Studio V3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="XsdStudio.xsd">
	<UpdatePackages />
	<Evolutions>
		<Evolution Version="1.0" Date="10/10/2017"><![CDATA[Project creation]]></Evolution>
		<Evolution Version="..." Date="..."><![CDATA[...]]></Evolution>
	</Evolutions>
	<PROCESSUS>
		<PROCESS Name="GLOBAL" Key="NoKey" Comment="Global Processus">
			<_DECLAREVAR>
				<STRUCTUREDON Name="GLOBAL">
					<OBJDON Name="PrjVersion">1.0</OBJDON>
					<OBJDON Name="PrjClient"><![CDATA[Sopra]]></OBJDON>
					<OBJDON Name="PrjName">Tutorial4</OBJDON>
					<OBJDON Name="PrjDate">10/10/2017</OBJDON>
					<OBJDON Name="PrjLabel"><![CDATA[Tutorial 4 - Scenario]]></OBJDON>
					<OBJDON Name="PrjComment"><![CDATA[]]></OBJDON>
					<OBJDON Name="LicenceURL" />
					<STRUCTUREDON Name="Xc_MessBoxHtml">
						<OBJDON Name="Style">style="font-size:12pt;font-family:'Arial'"</OBJDON>
						<OBJDON Name="ErrColor">white</OBJDON>
						<OBJDON Name="InfoColor">white</OBJDON>
						<OBJDON Name="ChoiceColor">white</OBJDON>
						<OBJDON Name="WarningColor">white</OBJDON>
						<OBJDON Name="ErrIcon">Critical.gif</OBJDON>
						<OBJDON Name="InfoIcon">Info.gif</OBJDON>
						<OBJDON Name="ChoiceIcon">Pencil.gif</OBJDON>
						<OBJDON Name="WarningIcon">Warning.gif</OBJDON>
						<OBJDON Name="StyleButton">style="font-size:12px;font-family:'Arial';width:80px"</OBJDON>
						<OBJDON Name="StyleText">style="font-size=11pt;font-family='Arial'"</OBJDON>
						<OBJDON Name="IconSize">32</OBJDON>
					</STRUCTUREDON>
				</STRUCTUREDON>
			</_DECLAREVAR>
			<SCRIPTS>
				<SCRIPT Name="Constants" Src="Tutorial4.min.js" Folder="Framework" />
			</SCRIPTS>
			<RESOURCES>
				<RESOURCE Name="Popup Bootbox" Src="%sdk%\templates\resources\popup\" Dest="popup" />
				<RESOURCE Name="contextor 16px" Src="%sdk%\templates\resources\bmp\contextor.png" Dest="bmp" />
				<RESOURCE Name="accept 16px" Src="%sdk%\templates\resources\bmp\accept.png" Dest="bmp" />
				<RESOURCE Name="cancel 16px" Src="%sdk%\templates\resources\bmp\cancel.png" Dest="bmp" />
				<RESOURCE Name="help 16px" Src="%sdk%\templates\resources\bmp\help.png" Dest="bmp" />
				<RESOURCE Name="information 16px" Src="%sdk%\templates\resources\bmp\information.png" Dest="bmp" />
				<RESOURCE Name="repeat 16px" Src="%sdk%\templates\resources\bmp\repeat.png" Dest="bmp" />
				<RESOURCE Name="stop 16px" Src="%sdk%\templates\resources\bmp\stop.png" Dest="bmp" />
				<RESOURCE Name="warning 16px" Src="%sdk%\templates\resources\bmp\warning.png" Dest="bmp" />
				<RESOURCE Name="record 16px" Src="%sdk%\templates\resources\bmp\record.png" Dest="bmp" />
				<RESOURCE Name="contextor 32px" Src="%sdk%\templates\resources\bmp32\contextor.png" Dest="bmp32" />
				<RESOURCE Name="accept 32px" Src="%sdk%\templates\resources\bmp32\accept.png" Dest="bmp32" />
				<RESOURCE Name="cancel 32px" Src="%sdk%\templates\resources\bmp32\cancel.png" Dest="bmp32" />
				<RESOURCE Name="help 32px" Src="%sdk%\templates\resources\bmp32\help.png" Dest="bmp32" />
				<RESOURCE Name="information 32px" Src="%sdk%\templates\resources\bmp32\information.png" Dest="bmp32" />
				<RESOURCE Name="user 32px" Src="%sdk%\templates\resources\bmp32\user.png" Dest="bmp32" />
				<RESOURCE Name="warning 32px" Src="%sdk%\templates\resources\bmp32\warning.png" Dest="bmp32" />
				<RESOURCE Name="icon 64px" Src="%sdk%\templates\resources\bmp64\contextor.png" Dest="bmp64" />
				<RESOURCE Name="hello 64px" Src="%sdk%\templates\resources\bmp64\hello.png" Dest="bmp64" />
				<RESOURCE Name="hello 128px" Src="%sdk%\templates\resources\bmp64\hello128.png" Dest="bmp64" />
				<RESOURCE Name="gif" Src="%sdk%\templates\resources\gif\" Dest="gif" />
			</RESOURCES>
			<ACTIONS />
			<EVENTS />
			<SCENARII>
				<Steps />
			</SCENARII>
		</PROCESS>
	</PROCESSUS>
	<APPLICATIONS>
		<APPLI Name="Eligibility" Nature="WEB3" TechnoSDK="V3" Sync="250">
			<CRITERE>
				<TITRE Scan="Full"><![CDATA[Eligibility]]></TITRE>
			</CRITERE>
			<_DECLAREVAR>
				<STRUCTUREDON Name="Eligibility" />
			</_DECLAREVAR>
			<_ECRANS>
				<PAGE Name="pEligibility" Comment="Eligibility">
					<CRITERE>
						<TITRE Scan="Full"><![CDATA[Eligibility]]></TITRE>
					</CRITERE>
					<OBJETS>
						<OBJET Name="oContractId">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R3R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[contract_id]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="oName">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R5R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[name]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="oFirstname">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R7R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[firstname]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="oSerialNumber">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R9R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[serial_number]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="oEquipmentType">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R11R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[equipment_type]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="oOfferType">
							<CRITERE>
								<TAG Name="INPUT" Scope="All" CapturedPos="16.R0R1R0R1R13R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[offer_type]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
						<OBJET Name="btSearch">
							<CRITERE>
								<TAG Name="BUTTON" Scope="All" CapturedPos="16.R0R1R0R1R1R0">
									<ATT Name="id">
										<VALUE Scan="Full"><![CDATA[search]]></VALUE>
									</ATT>
								</TAG>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
			</_ECRANS>
			<SCRIPTS />
			<ACTIONS />
			<EVENTS />
			<SCENARII>
				<Steps />
			</SCENARII>
		</APPLI>
		<APPLI Name="ApplicationScenario" Nature="WIN" TechnoSDK="V3">
			<CRITERE>
				<EXE Scan="Full"><![CDATA[SAMPLESCENARIO.EXE]]></EXE>
			</CRITERE>
			<_DECLAREVAR>
				<STRUCTUREDON Name="ApplicationScenario" />
			</_DECLAREVAR>
			<_ECRANS>
				<PAGE Name="pApplicationScenario" Comment="#32770 - Application Scenario - MFC">
					<CRITERE>
						<TITRE Scan="Full"><![CDATA[Application Scenario - MFC]]></TITRE>
					</CRITERE>
					<OBJETS>
						<OBJET Name="edEdit" CapturedPos="17.R0R2" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1002]]></IDENT>
							</CRITERE>
							<TRACK_EVENTS>
								<TRACK_EVENT Name="COMMAND" />
							</TRACK_EVENTS>
						</OBJET>
						<OBJET Name="btStart" CapturedPos="17.R0R3" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1003]]></IDENT>
							</CRITERE>
							<TRACK_EVENTS>
								<TRACK_EVENT Name="COMMAND" />
							</TRACK_EVENTS>
						</OBJET>
						<OBJET Name="btPopup1" CapturedPos="17.R0R0" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1000]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="btPopup2" CapturedPos="17.R0R1" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1001]]></IDENT>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
				<PAGE Name="pPopup1" Comment="#32770 - Popup 1">
					<CRITERE>
						<IDENT><![CDATA[0]]></IDENT>
						<TITRE Scan="Full"><![CDATA[Popup 1]]></TITRE>
					</CRITERE>
					<OBJETS>
						<OBJET Name="edEdit" CapturedPos="18.R0R1" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1004]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="btClose" CapturedPos="18.R0R0" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1]]></IDENT>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
				<PAGE Name="pPopup2" Comment="#32770 - Popup 2">
					<CRITERE>
						<TITRE Scan="Full"><![CDATA[Popup 2]]></TITRE>
					</CRITERE>
					<OBJETS>
						<OBJET Name="edEdit" CapturedPos="19.R0R1" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1004]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="btClose" CapturedPos="19.R0R0" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1]]></IDENT>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
			</_ECRANS>
			<SCRIPTS />
			<ACTIONS />
			<EVENTS />
			<SCENARII>
				<Steps />
			</SCENARII>
		</APPLI>
		<APPLI Name="SampleCRM" Nature="WIN" TechnoSDK="V3">
			<CRITERE>
				<EXE Scan="Full"><![CDATA[SAMPLECRM.EXE]]></EXE>
			</CRITERE>
			<_DECLAREVAR>
				<STRUCTUREDON Name="SampleCRM" />
			</_DECLAREVAR>
			<_ECRANS>
				<PAGE Name="pSampleCRM" Comment="#32770 - Sample CRM">
					<CRITERE>
						<TITRE Scan="Full"><![CDATA[Sample CRM]]></TITRE>
					</CRITERE>
					<OBJETS>
						<OBJET Name="edContractId" CapturedPos="20.R0R1" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1000]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="btSearch" CapturedPos="20.R0R2" TypObj="Btn">
							<CRITERE>
								<IDENT><![CDATA[1001]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="edName" CapturedPos="20.R0R9" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1003]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="edFirstname" CapturedPos="20.R0R8" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1002]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="edSerialNumber" CapturedPos="20.R0R25" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1007]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="edEquipmentType" CapturedPos="20.R0R29" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1018]]></IDENT>
							</CRITERE>
						</OBJET>
						<OBJET Name="edOfferType" CapturedPos="20.R0R31" TypObj="Txt">
							<CRITERE>
								<IDENT><![CDATA[1019]]></IDENT>
							</CRITERE>
						</OBJET>
					</OBJETS>
				</PAGE>
			</_ECRANS>
			<SCRIPTS />
			<ACTIONS />
			<EVENTS />
			<SCENARII>
				<Steps />
			</SCENARII>
		</APPLI>
	</APPLICATIONS>
</ConteXtorStudio>