import { Folder, Test, Cycle, CycleItem, User, TestStatus, Priority, CycleStatus, CycleItemResult, UUID, TestStep, CycleType, MapInfo, Scope, ScopeName } from '../types';

const csvData = `Summary,Test Repository Path,Priority,Assignee,Creator,Description,Affected Object Type,Developer Test Type,Development status,Manual Test Steps,Test Environments,Test Environments,Test Environments,Test Environments,Test Environments,Test Environments,Test Environments,Test Environments,Test Method,Test Type,Testing Level
Auto Full - LaneType (C2P),/REM Tests/High-Level-Tests/Auto Full/Lane Type,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Type,Automated,1-Not started,"[{""id"":1384957,""index"":1,""fields"":{""Action"":""V2V: DP-LANE_TYPE_MISMATCH"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186185}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - LaneType (V2V),/REM Tests/High-Level-Tests/Auto Full/Lane Type,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Type,Automated,1-Not started,"[{""id"":1384956,""index"":1,""fields"":{""Action"":""V2V: DP-LANE_TYPE_MISMATCH"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186184}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - TFLR (C2P),/REM Tests/High-Level-Tests/Auto Full/TFLR,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",TFLR,Automated,1-Not started,"[{""id"":1384933,""index"":1,""fields"":{""Action"":""V2V: TFLR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384934,""index"":2,""fields"":{""Action"":""V2V: TFLR_MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384935,""index"":3,""fields"":{""Action"":""V2V: EXIT_MISS_TFLR_MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384936,""index"":4,""fields"":{""Action"":""V2V: EXIT_FALSE_TFLR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384937,""index"":5,""fields"":{""Action"":""V2V: SIGN_FALSE (major) (Sign in this probe is TFL)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384938,""index"":6,""fields"":{""Action"":""V2V: TFLR_SIGN_MISS (major) (Sign in this probe is TFL)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384939,""index"":7,""fields"":{""Action"":""V2V: EXIT_MISS_SIGN_MISS (major) - TFL Miss, future also all signs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384940,""index"":8,""fields"":{""Action"":""V2V: EXIT_FALSE_SIGN_FALSE (major) - TFL Miss, future also all signs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384941,""index"":9,""fields"":{""Action"":""V2V: TFLR_DPSP_FALSE (minor) - covered in DPSP probes"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183},{""id"":1384942,""index"":10,""fields"":{""Action"":""V2V: TFLR_DPSP_MISS (minor) - covered in DPSP probes"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186183}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - CW Priority (C2P),/REM Tests/High-Level-Tests/Auto Full/CW Priority,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",CW_Priority,Automated,1-Not started,"[{""id"":1384928,""index"":1,""fields"":{""Action"":""V2V: CW_PRIORITY-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186182},{""id"":1384929,""index"":2,""fields"":{""Action"":""V2V: CW_PRIORITY-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186182},{""id"":1384930,""index"":3,""fields"":{""Action"":""V2V: CW_PRIORITY-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186182},{""id"":1384931,""index"":4,""fields"":{""Action"":""V2V: CW_PRIORITY-MULTI_MATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186182},{""id"":1384932,""index"":5,""fields"":{""Action"":""V2V: CW_PRIORITY-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186182}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - CW Priority (V2V),/REM Tests/High-Level-Tests/Auto Full/CW Priority,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",CW_Priority,Automated,1-Not started,"[{""id"":1384923,""index"":1,""fields"":{""Action"":""V2V: CW_PRIORITY-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186181},{""id"":1384924,""index"":2,""fields"":{""Action"":""V2V: CW_PRIORITY-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186181},{""id"":1384925,""index"":3,""fields"":{""Action"":""V2V: CW_PRIORITY-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186181},{""id"":1384926,""index"":4,""fields"":{""Action"":""V2V: CW_PRIORITY-MULTI_MATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186181},{""id"":1384927,""index"":5,""fields"":{""Action"":""V2V: CW_PRIORITY-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186181}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Crowd Speed (SA),/REM Tests/High-Level-Tests/Auto Full/Crowd Speed,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Crowd_Speed,Automated,1-Not started,"[{""id"":1384918,""index"":1,""fields"":{""Action"":""SA: CROWD_SPEED_JUMPS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186180},{""id"":1384919,""index"":2,""fields"":{""Action"":""SA: CROWD_SPEED_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186180},{""id"":1384920,""index"":3,""fields"":{""Action"":""SA: CROWD_SPEED_PARALLEL_DP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186180},{""id"":1384921,""index"":4,""fields"":{""Action"":""SA: CROWD_SPEED_RANGE_JUMP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186180}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - Crowd Speed (V2V),/REM Tests/High-Level-Tests/Auto Full/Crowd Speed,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Crowd_Speed,Automated,1-Not started,"[{""id"":1384917,""index"":1,""fields"":{""Action"":""V2V: DP-crowd_speed (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186179}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Legal Speed (C2P),/REM Tests/High-Level-Tests/Auto Full/Legal Speed,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Legal_Speed,Automated,1-Not started,"[{""id"":1384901,""index"":1,""fields"":{""Action"":""V2V: DP-legal_speed (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186178}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - Legal Speed (V2V),/REM Tests/High-Level-Tests/Auto Full/Legal Speed,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Legal_Speed,Automated,1-Not started,"[{""id"":1384900,""index"":1,""fields"":{""Action"":""V2V: DP-legal_speed (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186177}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Legal Speed (SA),/REM Tests/High-Level-Tests/Auto Full/Legal Speed,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Legal_Speed,Automated,1-Not started,"[{""id"":1384891,""index"":1,""fields"":{""Action"":""SA: LEGAL_SPEED_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186176},{""id"":1384892,""index"":2,""fields"":{""Action"":""SA: LEGAL_SPEED_RANGE_JUMP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186176},{""id"":1384893,""index"":3,""fields"":{""Action"":""SA: LEGAL_SPEED_JUMPS (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186176},{""id"":1384894,""index"":4,""fields"":{""Action"":""SA: LEGAL_SPEED_PARALLEL_DP (intermediate)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186176}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - Geo (SA),/REM Tests/High-Level-Tests/Auto Full/Geo,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For Gevald & Surface validation, the following jupyter notebook can support validation for some of the probes: [surface_gevald_test_notebook.ipynb|https://confluence.mobileye.com/download/attachments/389189051/surface_gevald_test_notebook.ipynb?version=1&amp;modificationDate=1752602603688&amp;api=v2]

 

 Events review via iShow should take the deep outputs from the 'Run probes' Jira.
 iShow cmd example:
 with local jump:
 ishow deep://parsed-mest-outputs/deep-job-uuid=361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame -c rem/deep/rem -j /mobileye/REM_FPA_Server/AV/AVE_sprints/SP24.9/JLM5x5/gevald_24.9.jump
 with remote jump:
 ishow deep://parsed-mest-outputs/deep-job-uuid=361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame -c rem/deep/rem -j s3://mobileye-deep.parsed-data.prod1/parts/0/361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame/{_}Metadata{_}/clip-list

 Jump file should be taken from the probe 'SaMainStandAloneIshowJumpEvents'.
 If ishow doesnt work, try in a new shell.
 If still doesnt work make sure you are working with propper aws profile perform:
 setenv AWS_PROFILE (or setenv AWS_PROFILE di)
 and
 cloud-ssov2 aws-shell --> choose di profile with tcsh shell 

 In iShow, in case you don't see the map on the clip, go to the REM widget --> 'map options' --> 'View Layer' --> in the drop down, choose 'no_filter'.",Geometry,Automated,1-Not started,"[{""id"":1384881,""index"":1,""fields"":{""Action"":""SA: ROAD_SURFACE-GEOMETRY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384882,""index"":2,""fields"":{""Action"":""SA: ROAD_SURFACE-TOPOLOGY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384883,""index"":3,""fields"":{""Action"":""SA: FPA-EDGE_INTERLACING (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384884,""index"":4,""fields"":{""Action"":""SA: DP-TOPOLOGY_DISCONNECTED (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384885,""index"":5,""fields"":{""Action"":""SA: DP-TOPOLOGY_DPS_DISCONNECTED (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384886,""index"":6,""fields"":{""Action"":""SA: FPA-MULTI_LEVEL_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384887,""index"":7,""fields"":{""Action"":""SA: FPA-EGO (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384888,""index"":8,""fields"":{""Action"":""SA: FPA-GEVALD - iShow (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384889,""index"":9,""fields"":{""Action"":""SA: FPA-GEVALD_DY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175},{""id"":1384890,""index"":10,""fields"":{""Action"":""SA: FPA-GEVALD_DX (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186175}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - SB (C2P),/REM Tests/High-Level-Tests/Auto Full/CW & SB,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Speed_Bump,Automated,1-Not started,"[{""id"":1384875,""index"":1,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174},{""id"":1384876,""index"":2,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174},{""id"":1384877,""index"":3,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174},{""id"":1384878,""index"":4,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174},{""id"":1384879,""index"":5,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174},{""id"":1384880,""index"":6,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186174}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - SB (V2V),/REM Tests/High-Level-Tests/Auto Full/CW & SB,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Speed_Bump,Automated,1-Not started,"[{""id"":1384869,""index"":1,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173},{""id"":1384870,""index"":2,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173},{""id"":1384871,""index"":3,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173},{""id"":1384872,""index"":4,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173},{""id"":1384873,""index"":5,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173},{""id"":1384874,""index"":6,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186173}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Clustering (V2V),/REM Tests/High-Level-Tests/Auto Full/Clustering and Sign Relevancy,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Clustering,Automated,1-Not started,"[{""id"":1384868,""index"":1,""fields"":{""Action"":""ClustersV2V Probes - Statistical review - pay extra attention to TFLs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186172}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - RE Semantics (C2P),/REM Tests/High-Level-Tests/Auto Full/RE,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 ",Road_Edge,Automated,1-Not started,"[{""id"":1384867,""index"":1,""fields"":{""Action"":""V2V: RE Semantics - RE-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186171}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - RE Modeling (C2P),/REM Tests/High-Level-Tests/Auto Full/RE,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 ",Road_Edge,Automated,1-Not started,"[{""id"":1384862,""index"":1,""fields"":{""Action"":""V2V: RE Geo - RE-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186170},{""id"":1384863,""index"":2,""fields"":{""Action"":""V2V: RE Geo - RE-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186170},{""id"":1384864,""index"":3,""fields"":{""Action"":""V2V: RE Geo - RE-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186170},{""id"":1384865,""index"":4,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186170},{""id"":1384866,""index"":5,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186170}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - LM Modeling (C2P),/REM Tests/High-Level-Tests/Auto Full/LM,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Mark,Automated,1-Not started,"[{""id"":1384851,""index"":1,""fields"":{""Action"":""V2V: LM Geo - LM-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384852,""index"":2,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384853,""index"":3,""fields"":{""Action"":""V2V: LM Geo - LM-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384854,""index"":4,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384855,""index"":5,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384856,""index"":6,""fields"":{""Action"":""V2V: LM Geo - LM-MISS_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384857,""index"":7,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384858,""index"":8,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384859,""index"":9,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_MAIN_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384860,""index"":10,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_REF_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169},{""id"":1384861,""index"":11,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_BOTH_HAVE_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186169}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - CW (C2P),/REM Tests/High-Level-Tests/Auto Full/CW & SB,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Crosswalk,Automated,1-Not started,"[{""id"":1384844,""index"":1,""fields"":{""Action"":""V2V: CW-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384845,""index"":2,""fields"":{""Action"":""V2V: CW-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384846,""index"":3,""fields"":{""Action"":""V2V: CW-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384847,""index"":4,""fields"":{""Action"":""V2V: CW-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384848,""index"":5,""fields"":{""Action"":""V2V: CW-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384849,""index"":6,""fields"":{""Action"":""V2V: CW-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168},{""id"":1384850,""index"":7,""fields"":{""Action"":""V2V: CW-BICYCLE_FALSE (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186168}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - CW (V2V),/REM Tests/High-Level-Tests/Auto Full/CW & SB,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Crosswalk,Automated,1-Not started,"[{""id"":1384837,""index"":1,""fields"":{""Action"":""V2V: CW-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384838,""index"":2,""fields"":{""Action"":""V2V: CW-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384839,""index"":3,""fields"":{""Action"":""V2V: CW-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384840,""index"":4,""fields"":{""Action"":""V2V: CW-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384841,""index"":5,""fields"":{""Action"":""V2V: CW-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384842,""index"":6,""fields"":{""Action"":""V2V: CW-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167},{""id"":1384843,""index"":7,""fields"":{""Action"":""V2V: CW-BICYCLE_FALSE (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186167}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - CW (SA),/REM Tests/High-Level-Tests/Auto Full/CW & SB,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Crosswalk,Automated,1-Not started,"[{""id"":1384828,""index"":1,""fields"":{""Action"":""SA: CW-Y_DIFF"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186166}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - Sign Relevancy (V2V),/REM Tests/High-Level-Tests/Auto Full/Clustering and Sign Relevancy,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Sign_Relevancy,Automated,1-Not started,"[{""id"":1384675,""index"":1,""fields"":{""Action"":""V2V: SignR-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186165},{""id"":1384676,""index"":2,""fields"":{""Action"":""V2V: SignR-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186165},{""id"":1384677,""index"":3,""fields"":{""Action"":""V2V: SignR-ELEMENT_MISS_OR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186165}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - DPSP (SA),/REM Tests/High-Level-Tests/Auto Full/DPSP,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",DPSP,Automated,1-Not started,"[{""id"":1384661,""index"":1,""fields"":{""Action"":""SA: DPSP-DUPLICATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384662,""index"":2,""fields"":{""Action"":""SA: DPSP-RELEVANCY_SET_ISSUE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384663,""index"":3,""fields"":{""Action"":""SA: DPSP-SP_AFTER_TFL (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384664,""index"":4,""fields"":{""Action"":""SA: DPSP-INLINE_ISSUE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384665,""index"":5,""fields"":{""Action"":""SA: DPSP-WRONG_GROUP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384666,""index"":6,""fields"":{""Action"":""SA: DPSP-Y_DIFF (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384667,""index"":7,""fields"":{""Action"":""SA: DPSP-MISSING_SP (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164},{""id"":1384668,""index"":8,""fields"":{""Action"":""SA: DPSP-CROSS (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186164}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - Modeling DPSP (C2P),/REM Tests/High-Level-Tests/Auto Full/DPSP,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",DPSP,Automated,1-Not started,"[{""id"":1384655,""index"":1,""fields"":{""Action"":""V2V: DPSP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163},{""id"":1384656,""index"":2,""fields"":{""Action"":""V2V: DPSP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163},{""id"":1384657,""index"":3,""fields"":{""Action"":""V2V: DPSP-MULTI_MATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163},{""id"":1384658,""index"":4,""fields"":{""Action"":""V2V: DPSP-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163},{""id"":1384659,""index"":5,""fields"":{""Action"":""V2V: DPSP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163},{""id"":1384660,""index"":6,""fields"":{""Action"":""V2V: DPSP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186163}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
Auto Full - Modeling DPSP (V2V),/REM Tests/High-Level-Tests/Auto Full/DPSP,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",DPSP,Automated,1-Not started,"[{""id"":1384649,""index"":1,""fields"":{""Action"":""V2V: DPSP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162},{""id"":1384650,""index"":2,""fields"":{""Action"":""V2V: DPSP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162},{""id"":1384651,""index"":3,""fields"":{""Action"":""V2V: DPSP-MULTI_MATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162},{""id"":1384652,""index"":4,""fields"":{""Action"":""V2V: DPSP-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162},{""id"":1384653,""index"":5,""fields"":{""Action"":""V2V: DPSP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162},{""id"":1384654,""index"":6,""fields"":{""Action"":""V2V: DPSP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186162}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - RE Semantics (V2V),/REM Tests/High-Level-Tests/Auto Full/RE,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 ",Road_Edge,Automated,1-Not started,"[{""id"":1384640,""index"":1,""fields"":{""Action"":""V2V: RE Semantics - RE-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186161}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - RE Modeling (V2V),/REM Tests/High-Level-Tests/Auto Full/RE,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 ",Road_Edge,Automated,1-Not started,"[{""id"":1384629,""index"":1,""fields"":{""Action"":""V2V: RE Geo - RE-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186160},{""id"":1384630,""index"":2,""fields"":{""Action"":""V2V: RE Geo - RE-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186160},{""id"":1384631,""index"":3,""fields"":{""Action"":""V2V: RE Geo - RE-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186160},{""id"":1384632,""index"":4,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186160},{""id"":1384633,""index"":5,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186160}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - LM Modeling (V2V),/REM Tests/High-Level-Tests/Auto Full/LM,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Mark,Automated,1-Not started,"[{""id"":1384557,""index"":1,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150},{""id"":1384558,""index"":2,""fields"":{""Action"":""V2V: LM Geo - LM-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150},{""id"":1384559,""index"":3,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150},{""id"":1384560,""index"":4,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150},{""id"":1384561,""index"":5,""fields"":{""Action"":""V2V: LM Geo - LM-MISS_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150},{""id"":1384562,""index"":6,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186150}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - LM Semantic (V2V),/REM Tests/High-Level-Tests/Auto Full/LM,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Mark,Automated,1-Not started,"[{""id"":1384542,""index"":1,""fields"":{""Action"":""V2V: LM Geo - LM-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384543,""index"":2,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384544,""index"":3,""fields"":{""Action"":""V2V: LM Geo - LM-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384545,""index"":4,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384546,""index"":5,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384547,""index"":6,""fields"":{""Action"":""V2V: LM Geo - LM-MISS_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384548,""index"":7,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384549,""index"":8,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384550,""index"":9,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_MAIN_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384551,""index"":10,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_REF_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148},{""id"":1384552,""index"":11,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_BOTH_HAVE_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186148}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - LM Semantics (C2P),/REM Tests/High-Level-Tests/Auto Full/LM,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Mark,Automated,1-Not started,"[{""id"":1384538,""index"":1,""fields"":{""Action"":""C2P: LM Semantics - LM-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186147},{""id"":1384539,""index"":2,""fields"":{""Action"":""C2P: LM Semantics - LM-TYPE_MISMATCH_MAIN_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186147},{""id"":1384540,""index"":3,""fields"":{""Action"":""C2P: LM Semantics - LM-TYPE_MISMATCH_REF_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186147},{""id"":1384541,""index"":4,""fields"":{""Action"":""C2P: LM Semantics - LM-TYPE_MISMATCH_BOTH_HAVE_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":186147}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
SASA V2V - Sanity test,/REM Tests/High-Level-Tests/SASA/Sanity,Medium,halimaa,tzipiw,,Multiple,Automated,1-Not started,"[{""id"":1350862,""index"":1,""fields"":{""Action"":""Statistic review on SASA V2V results"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":182842}]",Detroit,IL_HW,,,,,,,Sanity,Manual,
[SASA V2V] VERTICAL_DP_SPLIT,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] VERTICAL_DP_SPLIT,Topology,Automated,1-Not started,"[{""id"":1297514,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177789}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] MAP_HOLE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] MAP_HOLE,Multiple,Automated,1-Not started,"[{""id"":1297497,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177788}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] RART_0_BYPASS_LANE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] RART_0_BYPASS_LANE,RART,Automated,1-Not started,"[{""id"":1297496,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177787}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] RART_0_JUNCTION,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] RART_0_JUNCTION,RART,Automated,1-Not started,"[{""id"":1297495,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177786}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] PTL_FALSE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] PTL_FALSE,Lane_Type,Automated,1-Not started,"[{""id"":1297494,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177785}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_HIGH_JERK,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_HIGH_JERK,DP,Automated,1-Not started,"[{""id"":1297493,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177784}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] PRIORITY_SIGN_MISSING_DP_OVERLAP_FROM_DPSP,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] PRIORITY_SIGN_MISSING_DP_OVERLAP_FROM_DPSP,Priority,Automated,1-Not started,"[{""id"":1297492,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177783}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] PRIORITY_SIGN_DP_SKIP,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] PRIORITY_SIGN_DP_SKIP,Priority,Automated,1-Not started,"[{""id"":1297491,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177782}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_LOOSE_START,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_LOOSE_START,DP,Automated,1-Not started,"[{""id"":1297490,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177781}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_LOOSE_END,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_LOOSE_END,DP,Automated,1-Not started,"[{""id"":1297489,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177780}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] SPEED_BUMPS_ON_HIGH_CROWD,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] SPEED_BUMPS_ON_HIGH_CROWD,RART,Automated,1-Not started,"[{""id"":1297488,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177779}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] ROAD_TYPE_STITCHING_PROBLEM,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] ROAD_TYPE_STITCHING_PROBLEM,RART,Automated,1-Not started,"[{""id"":1297487,""index"":1,""fields"":{""Action"":""[SASA V2V] ROAD_TYPE_STITCHING_PROBLEM"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177778}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] SHORT_HW_COMPONENT,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] SHORT_HW_COMPONENT,RART,Automated,1-Not started,"[{""id"":1297486,""index"":1,""fields"":{""Action"":""[SASA V2V] SHORT_HW_COMPONENT"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177777}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] ROAD_OVERLAPS,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] ROAD_OVERLAPS,Topology,Automated,1-Not started,"[{""id"":1297485,""index"":1,""fields"":{""Action"":""[SASA V2V] ROAD_OVERLAPS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177776}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] ROAD_EDGE_BETWEEN_LANES,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] ROAD_EDGE_BETWEEN_LANES,Modeling,Automated,1-Not started,"[{""id"":1297484,""index"":1,""fields"":{""Action"":""[SASA V2V] ROAD_EDGE_BETWEEN_LANES"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177775}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_UNSYNCED_COASSIGNED_TFLS,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_UNSYNCED_COASSIGNED_TFLS,TFLR,Automated,1-Not started,"[{""id"":1297483,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_UNSYNCED_COASSIGNED_TFLS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177774}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_ASSIGNED_DP_X_UNASSIGNED_DP_KNOWN_ENTRANCE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_ASSIGNED_DP_X_UNASSIGNED_DP_KNOWN_ENTRANCE,TFLR,Automated,1-Not started,"[{""id"":1297482,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_ASSIGNED_DP_X_UNASSIGNED_DP_KNOWN_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177773}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_CNN_TFL_FALSE_LOW_PROBE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_CNN_TFL_FALSE_LOW_PROBE,TFLR,Automated,1-Not started,"[{""id"":1297481,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_CNN_TFL_FALSE_LOW_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177772}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_LOW_PROBE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_LOW_PROBE,TFLR,Automated,1-Not started,"[{""id"":1297480,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_LOW_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177771}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_HIGH_PROBE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_HIGH_PROBE,TFLR,Automated,1-Not started,"[{""id"":1297479,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_CNN_ENT_PROBABILITY_MISSED_HIGH_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177770}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_CNN_ENT_LOSS_HIGH_PROBE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_CNN_ENT_LOSS_HIGH_PROBE,TFLR,Automated,1-Not started,"[{""id"":1297478,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_CNN_ENT_LOSS_HIGH_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177769}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_INCONSISTENT_SUCCESSIVE_SP_GROUP,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_INCONSISTENT_SUCCESSIVE_SP_GROUP,TFLR,Automated,1-Not started,"[{""id"":1297477,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_INCONSISTENT_SUCCESSIVE_SP_GROUP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177768}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_MISSING_ENTRANCE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_MISSING_ENTRANCE,TFLR,Automated,1-Not started,"[{""id"":1297476,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_MISSING_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177767}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_KNOWN_ENTRANCE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_KNOWN_ENTRANCE,TFLR,Automated,1-Not started,"[{""id"":1297475,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_VALID_UNASSIGNED_TFLS_KNOWN_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177766}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_ENTRANCE_W_SUBSET_OF_DPS_ASSIGNED,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_ENTRANCE_W_SUBSET_OF_DPS_ASSIGNED,TFLR,Automated,1-Not started,"[{""id"":1297474,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_ENTRANCE_W_SUBSET_OF_DPS_ASSIGNED"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177765}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_SUSPICIOUS_ADJACENT_TFLS,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_SUSPICIOUS_ADJACENT_TFLS,TFLR,Automated,1-Not started,"[{""id"":1297473,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_SUSPICIOUS_ADJACENT_TFLS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177764}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_SP_W_1_TFL,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_SP_W_1_TFL,TFLR,Automated,1-Not started,"[{""id"":1297472,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_SP_W_1_TFL"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177763}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TFLR_SUSPICIOUS_PARTIAL_SHARING,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TFLR_SUSPICIOUS_PARTIAL_SHARING,TFLR,Automated,1-Not started,"[{""id"":1297471,""index"":1,""fields"":{""Action"":""[SASA V2V] TFLR_SUSPICIOUS_PARTIAL_SHARING"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177762}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] PEDS_SIGN_NO_CW,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] PEDS_SIGN_NO_CW,Crosswalk,Automated,1-Not started,"[{""id"":1297470,""index"":1,""fields"":{""Action"":""[SASA V2V] PEDS_SIGN_NO_CW"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177761}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_FALSE_LANE_CHANGE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_FALSE_LANE_CHANGE,DP,Automated,1-Not started,"[{""id"":1297469,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_FALSE_LANE_CHANGE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177760}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_IN_SHOULDER,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_IN_SHOULDER,DP,Automated,1-Not started,"[{""id"":1297468,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_IN_SHOULDER"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177759}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] CLOSE_ONCOMING_DPS,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] CLOSE_ONCOMING_DPS,DP,Automated,1-Not started,"[{""id"":1297467,""index"":1,""fields"":{""Action"":""[SASA V2V] CLOSE_ONCOMING_DPS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177758}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] TOPO_CONNECTION_NOT_IN_DP,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] TOPO_CONNECTION_NOT_IN_DP,DP,Automated,1-Not started,"[{""id"":1297466,""index"":1,""fields"":{""Action"":""[SASA V2V] TOPO_CONNECTION_NOT_IN_DP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177757}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_COUPLING_NODES,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_COUPLING_NODES,DP,Automated,1-Not started,"[{""id"":1297465,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_COUPLING_NODES"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177756}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_NODE_POSITION_CONSISTENCY,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_NODE_POSITION_CONSISTENCY,DP,Automated,1-Not started,"[{""id"":1297464,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_NODE_POSITION_CONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177755}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_GEOMETRY_ALTITUDE_INCONSISTENCY,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_GEOMETRY_ALTITUDE_INCONSISTENCY,DP,Automated,1-Not started,"[{""id"":1297463,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_GEOMETRY_ALTITUDE_INCONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177754}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_REDUNDANT,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_REDUNDANT,DP,Automated,1-Not started,"[{""id"":1297462,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_REDUNDANT"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177753}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_INTRUDING_IMPASSABLE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_INTRUDING_IMPASSABLE,DP,Automated,1-Not started,"[{""id"":1297461,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_INTRUDING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177752}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_INTRUDING_PASSABLE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_INTRUDING_PASSABLE,DP,Automated,1-Not started,"[{""id"":1297460,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_INTRUDING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177751}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_TRESPASSING_IMPASSABLE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_TRESPASSING_IMPASSABLE,DP,Automated,1-Not started,"[{""id"":1297459,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_TRESPASSING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177750}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_TRESPASSING_PASSABLE,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_TRESPASSING_PASSABLE,DP,Automated,1-Not started,"[{""id"":1297458,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_TRESPASSING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177749}]",Detroit,IL_HW,,,,,,,V2V,Manual,
[SASA V2V] DP_OFF_ROAD,/REM Tests/High-Level-Tests/SASA/Full,Medium,halimaa,tzipiw,[SASA V2V] DP_OFF_ROAD,DP,Automated,1-Not started,"[{""id"":1297457,""index"":1,""fields"":{""Action"":""[SASA V2V] DP_OFF_ROAD"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":177748}]",Detroit,IL_HW,,,,,,,V2V,Manual,
SR Full Review,/REM Tests/High-Level-Tests/SR,Medium,yogevm,tzipiw,,Multiple,Automated,1-Not started,[],,,,,,,,,,Manual,
SR Sanity Review,/REM Tests/High-Level-Tests/SR,Medium,yogevm,tzipiw,,Multiple,Automated,1-Not started,[],,,,,,,,,,Manual,
[Setup] SR Run Tools,/REM Tests/High-Level-Tests/SR,Medium,yogevm,tzipiw,,Multiple,Automated,1-Not started,[],,,,,,,,,,Manual,
[Setup] SR Data Preparation,/REM Tests/High-Level-Tests/SR,Medium,yogevm,tzipiw,,Multiple,Automated,1-Not started,[],,,,,,,,,,Manual,
[Setup] CM probes run,/REM Tests/High-Level-Tests/CM stitching,Medium,michelleh,tzipiw,CM stitching test,Multiple,Automated,1-Not started,"[{""id"":1260408,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":173123}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - TFLR Heuristic Probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - TFLR Heuristic Probes,TFLR,Automated,1-Not started,"[{""id"":1242216,""index"":1,""fields"":{""Action"":""TFLR_SUSPICIOUS_PARTIAL_SHARING"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242217,""index"":2,""fields"":{""Action"":""TFLR_SP_W_1_TFL"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242218,""index"":3,""fields"":{""Action"":""TFLR_SUSPICIOUS_ADJACENT_TFLS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242219,""index"":4,""fields"":{""Action"":""TFLR_ENTRANCE_W_SUBSET_OF_DPS_ASSIGNED"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242220,""index"":5,""fields"":{""Action"":""TFLR_VALID_UNASSIGNED_TFLS_KNOWN_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242221,""index"":6,""fields"":{""Action"":""TFLR_VALID_UNASSIGNED_TFLS_MISSING_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242222,""index"":7,""fields"":{""Action"":""TFLR_INCONSISTENT_SUCCESSIVE_SP_GROUP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242223,""index"":8,""fields"":{""Action"":""TFLR_ASSIGNED_DP_X_UNASSIGNED_DP_KNOWN_ENTRANCE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355},{""id"":1242224,""index"":9,""fields"":{""Action"":""TFLR_UNSYNCED_COASSIGNED_TFLS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171355}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - TFLR CNN Probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - TFLR CNN Probes,TFLR,Automated,1-Not started,"[{""id"":1242211,""index"":1,""fields"":{""Action"":""TFLR_CNN_ENT_LOSS_HIGH_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171354},{""id"":1242212,""index"":2,""fields"":{""Action"":""TFLR_CNN_ENT_PROBABILITY_MISSED_HIGH_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171354},{""id"":1242213,""index"":3,""fields"":{""Action"":""TFLR_CNN_ENT_PROBABILITY_MISSED_HIGH_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171354},{""id"":1242214,""index"":4,""fields"":{""Action"":""TFLR_CNN_ENT_PROBABILITY_MISSED_LOW_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171354},{""id"":1242215,""index"":5,""fields"":{""Action"":""TFLR_CNN_TFL_FALSE_LOW_PROBE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171354}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - RART probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - RART probes,RART,Automated,1-Not started,"[{""id"":1242208,""index"":1,""fields"":{""Action"":""SHORT_HW_COMPONENT"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171353},{""id"":1242209,""index"":2,""fields"":{""Action"":""ROAD_TYPE_STITCHING_PROBLEM"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171353},{""id"":1242210,""index"":3,""fields"":{""Action"":""SPEED_BUMPS_ON_HIGH_CROWD"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171353}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - Priority probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - Priority probes,Multiple,Automated,1-Not started,"[{""id"":1242206,""index"":1,""fields"":{""Action"":""PRIORITY_SIGN_DP_SKIP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171352},{""id"":1242207,""index"":2,""fields"":{""Action"":""PRIORITY_SIGN_MISSING_DP_OVERLAP_FROM_DPSP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171352}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - Topology and Modeling probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - Topology and Modeling probes,Multiple,Automated,1-Not started,"[{""id"":1242204,""index"":1,""fields"":{""Action"":""ROAD_EDGE_BETWEEN_LANES"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171351},{""id"":1242205,""index"":2,""fields"":{""Action"":""ROAD_OVERLAPS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171351}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - Crosswalk probe,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - Crosswalk probe,Crosswalk,Automated,1-Not started,"[{""id"":1242203,""index"":1,""fields"":{""Action"":""PEDS_SIGN_NO_CW"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171350}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
SASA V2V - DP Probes,/REM Tests/High-Level-Tests/SASA (group),Medium,danam,tzipiw,SASA V2V - DP Probes,DP,Automated,1-Not started,"[{""id"":1242173,""index"":1,""fields"":{""Action"":""DP_OFF_ROAD"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242174,""index"":2,""fields"":{""Action"":""DP_TRESPASSING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242175,""index"":3,""fields"":{""Action"":""DP_TRESPASSING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242176,""index"":4,""fields"":{""Action"":""DP_INTRUDING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242177,""index"":5,""fields"":{""Action"":""DP_INTRUDING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242178,""index"":6,""fields"":{""Action"":""DP_REDUNDANT"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242179,""index"":7,""fields"":{""Action"":""DP_GEOMETRY_ALTITUDE_INCONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242180,""index"":8,""fields"":{""Action"":""DP_NODE_POSITION_CONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242181,""index"":9,""fields"":{""Action"":""DP_COUPLING_NODES"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242182,""index"":10,""fields"":{""Action"":""TOPO_CONNECTION_NOT_IN_DP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242183,""index"":11,""fields"":{""Action"":""CLOSE_ONCOMING_DPS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242184,""index"":12,""fields"":{""Action"":""DP_IN_SHOULDER"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242185,""index"":13,""fields"":{""Action"":""DP_FALSE_LANE_CHANGE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242186,""index"":14,""fields"":{""Action"":""DP_LOOSE_END"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242187,""index"":15,""fields"":{""Action"":""DP_LOOSE_START"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242188,""index"":16,""fields"":{""Action"":""DP_OFF_ROAD"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242189,""index"":17,""fields"":{""Action"":""DP_TRESPASSING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242190,""index"":18,""fields"":{""Action"":""DP_TRESPASSING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242191,""index"":19,""fields"":{""Action"":""DP_INTRUDING_PASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242192,""index"":20,""fields"":{""Action"":""DP_INTRUDING_IMPASSABLE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242193,""index"":21,""fields"":{""Action"":""DP_REDUNDANT"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242194,""index"":22,""fields"":{""Action"":""DP_GEOMETRY_ALTITUDE_INCONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242195,""index"":23,""fields"":{""Action"":""DP_NODE_POSITION_CONSISTENCY"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242196,""index"":24,""fields"":{""Action"":""DP_COUPLING_NODES"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242197,""index"":25,""fields"":{""Action"":""TOPO_CONNECTION_NOT_IN_DP"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242198,""index"":26,""fields"":{""Action"":""CLOSE_ONCOMING_DPS"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242199,""index"":27,""fields"":{""Action"":""DP_IN_SHOULDER"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242200,""index"":28,""fields"":{""Action"":""DP_FALSE_LANE_CHANGE"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242201,""index"":29,""fields"":{""Action"":""DP_LOOSE_END"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349},{""id"":1242202,""index"":30,""fields"":{""Action"":""DP_LOOSE_START"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171349}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
[GT test] Entities - DP issues,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Entities - DP issues,DP,Automated,1-Not started,"[{""id"":1242172,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171348}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Modeling - RE,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Modeling - RE,Road_Edge,Automated,1-Not started,"[{""id"":1242171,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171347}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - Sign Relevancy,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - Sign Relevancy,Sign_Relevancy,Automated,1-Not started,"[{""id"":1242170,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171346}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - RE,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - RE,Road_Edge,Automated,1-Not started,"[{""id"":1242169,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171345}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Modeling - LM,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Modeling - LM,Lane_Mark,Automated,1-Not started,"[{""id"":1242168,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171344}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics- Lane Type,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics- Lane Type,Lane_Type,Automated,1-Not started,"[{""id"":1242167,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171343}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Modeling - DPSP,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Modeling - DPSP,DPSP,Automated,1-Not started,"[{""id"":1242166,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171342}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - TFLR,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - TFLR,TFL,Automated,1-Not started,"[{""id"":1242165,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171341}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Modeling - SB,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Modeling - SB,Speed_Bump,Automated,1-Not started,"[{""id"":1242164,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171340}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - Legal Speed,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - Legal Speed,Legal_Speed,Automated,1-Not started,"[{""id"":1242163,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171339}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - TFLR Complex / Junction,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - TFLR Complex / Junction,TFLR,Automated,1-Not started,"[{""id"":1242162,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171338}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - CW Priority,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - CW Priority,Crosswalk,Automated,1-Not started,"[{""id"":1242161,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171337}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Semantics - LM,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,[GT test] Semantics - LM,Lane_Mark,Automated,1-Not started,"[{""id"":1242160,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171336}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[GT test] Modeling - CW,/REM Tests/High-Level-Tests/Auto Full/GT,Medium,michelleh,tzipiw,"[GT test] Modeling - CW

 

Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&modificationDate=1736406098461&api=v2]",Crosswalk,Automated,1-Not started,"[{""id"":1242159,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171335}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,C2P,Manual,
[Setup] Generate sanity xls,/REM Tests/High-Level-Tests/Auto Sanity/Setup,Medium,michelleh,tzipiw,"[Setup] - Generate sanity xls

 
 * cloud-ssov2
 * go to your mepy_algo folder
 * git switch fpa_server_stable
 * git branch
 * git pull
 * source init_py3.tcsh
 * Make Sure that the thresholds files V2V & SA are updated: /mobileye/REM_FPA_DynREM/server/release_maps_version_testing/usefull_files/
 * Create a copy
cp appcode/REM/fpa_validation/fpa_scripts/create_sanity_stats/config.py /homes/talab/Desktop/sanity_25.6_vs_24.12.py
 * Open the copied python file (can do it manually) – change configRun the python file
python /homes/talab/Desktop/<name>.py
 
Additional Info - [here|https://confluence.mobileye.com/display/RFSV/Running+Sanity?focusedCommentId=510109385#comment-510109385]

DO NOT CHANGE THE VARIABLE NAMES",Multiple,Automated,1-Not started,"[{""id"":1242158,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171334}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
[Setup] Run probes,/REM Tests/High-Level-Tests/Auto Sanity/Setup,Medium,alexandrn,tzipiw,"[Setup] - run probes
 * You can run the probes via skyrun with latest stable branch.
 * If skyrun doesnt work use the manual method:
 ** Before running the probes, make sure:
 *** You are on 'fpa_server_stable' branch (check via 'git branch')
 *** Run 'git pull' to get the latest probe code
 *** Run 'git status' to make sure you are on the latest (expected output: 'Your branch is up to date with 'origin/fpa_server_stable'')
 *** Update a new conf file from the above git pull
 *** Use the following string format for the map name for the fpa_config.run_name_suffix value:
""fpa_v2v_<country>{_}<main_version.major.minor>_vs{_}<ref_version.major.minor>"" (example: fpa_v2v_PARIS_24.9.45_vs_24.8.97)

 * For GT execution, either use skyrun or manual run - follow the instructions at: [GT_info_link|https://confluence.mobileye.com/pages/viewpage.action?pageId=325122995]
 ** Run both Main vs GT and Ref vs GT

 * Run M2V on all GT maps - again skyrun / manual

 * For JLM & IL HW also run m2f.
 ** Command example:
/mobileye/shared/Tools/qa_algo_tools/users/rem_RELEASE/venv/m2f_gate/bin/python /mobileye/shared/Tools/qa_algo_tools/rem_tools/map2frame_gate/map2frame_gate_launch.py --run-type map --map-base-input vt -m <JLM/IL HW process map url (not probe)> --tags <JLM_5X5 or IL_HW> -o <output location example, last two folders should represent current mest and map: /mobileye/REM_FPA_Server/AV/AVE_sprints/SP24.10_dev/JLM5x5/> --mest <for JLM: /mobileye/PerfectsData_REM_05/oshri/projects/5X5_Maps/JLM/clipext/4.23.03.01_2024-01-09_REMFPAD-2636/MONO/, for IL HW: /mobileye/PerfectsData_REM_05/oshri/projects/Israel/Data/clipext/4.23.03.01_2024-01-09_REMFPAD-2636/MONO/>
 ** Place in this Jira the output location of the m2f run and the deep job id and s3 locations.
For example:
output: /mobileye/REM_FPA_Server/AV/AVE_sprints/SP24.9/JLM5x5/
deep id: deep://parsed-mest-outputs/deep-job-uuid=361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame
s3 location: s3://mobileye-deep.parsed-data.prod1/parts/0/361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame/{_}Metadata{_}/clip-list
 ** Shell setup - you might be required to set:
setenv AWS_PROFILE di
setenv AWS_PROFILE DEV
 ** Debug:
 *** For error: ""ImportError: cannot import name 'Mapping' from 'collections'""
open a new terminal, and use the following venv: /mobileye/shared/Tools/.ishow/envs/conda/latest_env/
 *** For error: ""TypeError: 'NoneType' object is not subscriptable""
run: rm ~/.me_auth/deep_cache.bin",Multiple,Automated,1-Not started,"[{""id"":1242157,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171333}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - TFLR (V2V),/REM Tests/High-Level-Tests/Auto Full/TFLR,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",TFLR,Automated,1-Not started,"[{""id"":1242152,""index"":1,""fields"":{""Action"":""V2V: TFLR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1242153,""index"":2,""fields"":{""Action"":""V2V: TFLR_MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1242154,""index"":3,""fields"":{""Action"":""V2V: EXIT_MISS_TFLR_MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1242155,""index"":4,""fields"":{""Action"":""V2V: EXIT_FALSE_TFLR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289663,""index"":5,""fields"":{""Action"":""V2V: SIGN_FALSE (major) (Sign in this probe is TFL)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289664,""index"":6,""fields"":{""Action"":""V2V: TFLR_SIGN_MISS (major) (Sign in this probe is TFL)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289667,""index"":7,""fields"":{""Action"":""V2V: EXIT_MISS_SIGN_MISS (major) - TFL Miss, future also all signs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289668,""index"":8,""fields"":{""Action"":""V2V: EXIT_FALSE_SIGN_FALSE (major) - TFL Miss, future also all signs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289665,""index"":9,""fields"":{""Action"":""V2V: TFLR_DPSP_FALSE (minor) - covered in DPSP probes"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331},{""id"":1289666,""index"":10,""fields"":{""Action"":""V2V: TFLR_DPSP_MISS (minor) - covered in DPSP probes"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171331}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - CW Priority,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",CW_Priority,Automated,1-Not started,"[{""id"":1242147,""index"":1,""fields"":{""Action"":""V2V: CW_PRIORITY-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171330},{""id"":1242148,""index"":2,""fields"":{""Action"":""V2V: CW_PRIORITY-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171330},{""id"":1242149,""index"":3,""fields"":{""Action"":""V2V: CW_PRIORITY-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171330},{""id"":1242150,""index"":4,""fields"":{""Action"":""V2V: CW_PRIORITY-MULTI_MATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171330},{""id"":1242151,""index"":5,""fields"":{""Action"":""V2V: CW_PRIORITY-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171330}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Crowd Speed,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Crowd_Speed,Automated,1-Not started,"[{""id"":1242142,""index"":1,""fields"":{""Action"":""SA: CROWD_SPEED_JUMPS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171329},{""id"":1242143,""index"":2,""fields"":{""Action"":""SA: CROWD_SPEED_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171329},{""id"":1242144,""index"":3,""fields"":{""Action"":""SA: CROWD_SPEED_PARALLEL_DP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171329},{""id"":1242145,""index"":4,""fields"":{""Action"":""SA: CROWD_SPEED_RANGE_JUMP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171329},{""id"":1242146,""index"":5,""fields"":{""Action"":""V2V: DP-crowd_speed (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171329}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Legal Speed,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Legal_Speed,Automated,1-Not started,"[{""id"":1242138,""index"":1,""fields"":{""Action"":""SA: LEGAL_SPEED_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171328},{""id"":1242140,""index"":2,""fields"":{""Action"":""SA: LEGAL_SPEED_RANGE_JUMP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171328},{""id"":1242137,""index"":3,""fields"":{""Action"":""SA: LEGAL_SPEED_JUMPS (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171328},{""id"":1242139,""index"":4,""fields"":{""Action"":""SA: LEGAL_SPEED_PARALLEL_DP (intermediate)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171328},{""id"":1242141,""index"":5,""fields"":{""Action"":""V2V: DP-legal_speed (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171328}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - DP (V2V),/REM Tests/High-Level-Tests/Auto Full/DP,Medium,michelleh,tzipiw,"Initial testing should be done on 'main' and 'minor' categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review prioirty.
Document and save in Jira the statistical records and review prioirty before continueing to full review.
Priority should be defined as P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

The 'major' category should be the first to be reviewed, as it is the most important one. The 'minor' category should be the next in priority and the 'main' category can be left for the end, with lower coverage.

The 'main' category should be the first to be reviewed, as it is the most important one. The 'minor' category should be the next in priority and the 'major' category can be left for the end, with lower coverage.

The 'main' category should be the first to be reviewed, as it is the most important one. The    'major' should then be the next in priority and 'minor' can be left for the end, with lower coverage ",DP,Automated,1-Not started,"[{""id"":1242132,""index"":1,""fields"":{""Action"":""V2V: DP_MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171327},{""id"":1242133,""index"":2,""fields"":{""Action"":""V2V: DP_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171327},{""id"":1242134,""index"":3,""fields"":{""Action"":""V2V: DP_INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171327},{""id"":1242135,""index"":4,""fields"":{""Action"":""V2V: DP_MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171327},{""id"":1242136,""index"":5,""fields"":{""Action"":""V2V: DP_MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171327}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - DP (SA),/REM Tests/High-Level-Tests/Auto Full/DP,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",DP,Automated,1-Not started,"[{""id"":1242119,""index"":1,""fields"":{""Action"":""SA: DP_TOO_CLOSE_TO_LM (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242120,""index"":2,""fields"":{""Action"":""SA: DP_TOO_CLOSE_TO_RE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242121,""index"":3,""fields"":{""Action"":""SA: DP-END (major) - low quality probe, mainly stats review"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242122,""index"":4,""fields"":{""Action"":""SA: DP-HOLE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242123,""index"":5,""fields"":{""Action"":""SA: DP-MISSING_SEMANTIC_SUCCESSOR (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242124,""index"":6,""fields"":{""Action"":""SA: FPA-DP-MAP-HOLE (major) - low quality probe - covered by dp-hole - decide if to continue using?"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242125,""index"":7,""fields"":{""Action"":""SA: DP-NON_PHYSICAL (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242126,""index"":8,""fields"":{""Action"":""SA: DP-WAVY (major) - high quality probe - statistic review only ?"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242127,""index"":9,""fields"":{""Action"":""SA: DP-REDUNDANT (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242128,""index"":10,""fields"":{""Action"":""SA: DP-DUPLICATE (major) - high quality probe - statistic review only ?"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242129,""index"":11,""fields"":{""Action"":""SA: DP-MERGE_BACK (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242130,""index"":12,""fields"":{""Action"":""SA: DP-NON_PHYSICAL_BETWEEN_DPS (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326},{""id"":1242131,""index"":13,""fields"":{""Action"":""SA: DP-PINCHES (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171326}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - Geo,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For Gevald & Surface validation, the following jupyter notebook can support validation for some of the probes: [surface_gevald_test_notebook.ipynb|https://confluence.mobileye.com/download/attachments/389189051/surface_gevald_test_notebook.ipynb?version=1&amp;modificationDate=1752602603688&amp;api=v2]

 

 Events review via iShow should take the deep outputs from the 'Run probes' Jira.
 iShow cmd example:
 with local jump:
 ishow deep://parsed-mest-outputs/deep-job-uuid=361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame -c rem/deep/rem -j /mobileye/REM_FPA_Server/AV/AVE_sprints/SP24.9/JLM5x5/gevald_24.9.jump
 with remote jump:
 ishow deep://parsed-mest-outputs/deep-job-uuid=361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame -c rem/deep/rem -j s3://mobileye-deep.parsed-data.prod1/parts/0/361f8d88-7b37-11ef-b874-0a58a9feac02-map2frame/{_}Metadata{_}/clip-list

 Jump file should be taken from the probe 'SaMainStandAloneIshowJumpEvents'.
 If ishow doesnt work, try in a new shell.
 If still doesnt work make sure you are working with propper aws profile perform:
 setenv AWS_PROFILE (or setenv AWS_PROFILE di)
 and
 cloud-ssov2 aws-shell --> choose di profile with tcsh shell 

 In iShow, in case you don't see the map on the clip, go to the REM widget --> 'map options' --> 'View Layer' --> in the drop down, choose 'no_filter'.",Geometry,Automated,1-Not started,"[{""id"":1242109,""index"":1,""fields"":{""Action"":""SA: ROAD_SURFACE-GEOMETRY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242110,""index"":2,""fields"":{""Action"":""SA: ROAD_SURFACE-TOPOLOGY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242111,""index"":3,""fields"":{""Action"":""SA: FPA-EDGE_INTERLACING (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242112,""index"":4,""fields"":{""Action"":""SA: DP-TOPOLOGY_DISCONNECTED (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242113,""index"":5,""fields"":{""Action"":""SA: DP-TOPOLOGY_DPS_DISCONNECTED (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242114,""index"":6,""fields"":{""Action"":""SA: FPA-MULTI_LEVEL_LOW (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242115,""index"":7,""fields"":{""Action"":""SA: FPA-EGO (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242116,""index"":8,""fields"":{""Action"":""SA: FPA-GEVALD - iShow (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242117,""index"":9,""fields"":{""Action"":""SA: FPA-GEVALD_DY (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325},{""id"":1242118,""index"":10,""fields"":{""Action"":""SA: FPA-GEVALD_DX (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171325}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Standalone,Manual,
Auto Full - SB,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Speed_Bump,Automated,1-Not started,"[{""id"":1242104,""index"":1,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324},{""id"":1242105,""index"":2,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324},{""id"":1242103,""index"":3,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324},{""id"":1242106,""index"":4,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324},{""id"":1242107,""index"":5,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324},{""id"":1242108,""index"":6,""fields"":{""Action"":""V2V: SB-SPEEDBUMP-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171324}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - CW,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 

For CW validation, the following xls can support validation for some of the probes: [CW&SB 24.11.xlsx|https://confluence.mobileye.com/download/attachments/389189051/CW%26SB%2024.11.xlsx?version=1&amp;modificationDate=1736406098461&amp;api=v2]",Crosswalk,Automated,1-Not started,"[{""id"":1242095,""index"":1,""fields"":{""Action"":""SA: CW-Y_DIFF"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242096,""index"":2,""fields"":{""Action"":""V2V: CW-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242097,""index"":3,""fields"":{""Action"":""V2V: CW-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242098,""index"":4,""fields"":{""Action"":""V2V: CW-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242099,""index"":5,""fields"":{""Action"":""V2V: CW-DUPLICATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242100,""index"":6,""fields"":{""Action"":""V2V: CW-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242101,""index"":7,""fields"":{""Action"":""V2V: CW-TYPE_MISMATCH (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323},{""id"":1242102,""index"":8,""fields"":{""Action"":""V2V: CW-BICYCLE_FALSE (TBD)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171323}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Sign Relevancy,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Sign_Relevancy,Automated,1-Not started,"[{""id"":1242093,""index"":1,""fields"":{""Action"":""V2V: SignR-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171322},{""id"":1289661,""index"":2,""fields"":{""Action"":""V2V: SignR-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171322},{""id"":1289662,""index"":3,""fields"":{""Action"":""V2V: SignR-ELEMENT_MISS_OR_FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171322}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - Clustering ,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Clustering,Automated,1-Not started,"[{""id"":1242092,""index"":1,""fields"":{""Action"":""ClustersV2V Probes - Statistical review - pay extra attention to TFLs"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171321}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - DPSP,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",DPSP,Automated,1-Not started,"[{""id"":1242078,""index"":1,""fields"":{""Action"":""SA: DPSP-DUPLICATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242079,""index"":2,""fields"":{""Action"":""SA: DPSP-RELEVANCY_SET_ISSUE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242080,""index"":3,""fields"":{""Action"":""SA: DPSP-SP_AFTER_TFL (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242081,""index"":4,""fields"":{""Action"":""SA: DPSP-INLINE_ISSUE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242083,""index"":5,""fields"":{""Action"":""SA: DPSP-WRONG_GROUP (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242084,""index"":6,""fields"":{""Action"":""SA: DPSP-Y_DIFF (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242082,""index"":7,""fields"":{""Action"":""SA: DPSP-MISSING_SP (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242085,""index"":8,""fields"":{""Action"":""SA: DPSP-CROSS (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242086,""index"":9,""fields"":{""Action"":""V2V: DPSP-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242087,""index"":10,""fields"":{""Action"":""V2V: DPSP-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242088,""index"":11,""fields"":{""Action"":""V2V: DPSP-MULTI_MATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242089,""index"":12,""fields"":{""Action"":""V2V: DPSP-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242090,""index"":13,""fields"":{""Action"":""V2V: DPSP-MATCHED (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320},{""id"":1242091,""index"":14,""fields"":{""Action"":""V2V: DPSP-INACCURATE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171320}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - RE,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.

 ",Road_Edge,Automated,1-Not started,"[{""id"":1242072,""index"":1,""fields"":{""Action"":""V2V: RE Geo - RE-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319},{""id"":1242073,""index"":2,""fields"":{""Action"":""V2V: RE Geo - RE-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319},{""id"":1242074,""index"":3,""fields"":{""Action"":""V2V: RE Geo - RE-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319},{""id"":1242075,""index"":4,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319},{""id"":1242076,""index"":5,""fields"":{""Action"":""V2V: RE Geo - RE-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319},{""id"":1242077,""index"":6,""fields"":{""Action"":""V2V: RE Semantics - RE-TYPE_MISMATCH (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171319}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Full - LM,/REM Tests/High-Level-Tests/Auto Full/Old,Medium,michelleh,tzipiw,"Initial testing should be done on all categories by a short statistical review in SA, V2V & GT runs on all relevant maps to find potential Showstoppers and define review priority.
Document and save in Jira the statistical records and review priority before continuing to full review.
Priority should be defined as:

P1 - in case of significant statistical performance for regressions / improvements.
P2 - in case of minor statistical performance for regressions / improvements.
P3 - in case of no statistical performance for regressions / improvements.

Priority should also take into account the definitions below of which probes are 'major' - should be reviewed in higher priority (should be reviewed even if defined as P3 above), and which are 'minor' - can be left for the end, and with lower coverage.",Lane_Mark,Automated,1-Not started,"[{""id"":1289660,""index"":1,""fields"":{""Action"":""V2V: LM Geo - LM-MISS (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242062,""index"":2,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242063,""index"":3,""fields"":{""Action"":""V2V: LM Geo - LM-INACCURATE (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242064,""index"":4,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_MAIN (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242065,""index"":5,""fields"":{""Action"":""V2V: LM Geo - LM-MULTI_REF (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242066,""index"":6,""fields"":{""Action"":""V2V: LM Geo - LM-MISS_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242067,""index"":7,""fields"":{""Action"":""V2V: LM Geo - LM-FALSE_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242068,""index"":8,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH (major)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242069,""index"":9,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_MAIN_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242070,""index"":10,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_REF_HAS_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318},{""id"":1242071,""index"":11,""fields"":{""Action"":""V2V: LM Semantics - LM-TYPE_MISMATCH_BOTH_HAVE_RE (minor)"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171318}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
CM stitching test,/REM Tests/High-Level-Tests/CM stitching,Medium,michelleh,tzipiw,CM stitching test,Multiple,Automated,1-Not started,"[{""id"":1242054,""index"":1,""fields"":{""Action"":""undefined"",""Data"":"""",""Expected Result"":""""},""attachments"":[],""testVersionId"":171313}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - Crowd Speed,/REM Tests/High-Level-Tests/Auto Sanity/Speed,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Crowd_Speed,Automated,1-Not started,"[{""id"":1242053,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171312}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - Legal Speed,/REM Tests/High-Level-Tests/Auto Sanity/Speed,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Legal_Speed,Automated,1-Not started,"[{""id"":1242052,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171311}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - SB,/REM Tests/High-Level-Tests/Auto Sanity/CW & SB,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Speed_Bump,Automated,1-Not started,"[{""id"":1242051,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171310}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - CW Priority,/REM Tests/High-Level-Tests/Auto Sanity/CW Priority,Medium,michelleh,tzipiw,Sanity review on FPA Probes,CW_Priority,Automated,1-Not started,"[{""id"":1242050,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171309}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - DPSP,/REM Tests/High-Level-Tests/Auto Sanity/DPSP,Medium,michelleh,tzipiw,Sanity review on FPA Probes,DPSP,Automated,1-Not started,"[{""id"":1242049,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171308}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - Geo,/REM Tests/High-Level-Tests/Auto Sanity/Geo,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Geometry,Automated,1-Not started,"[{""id"":1242048,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171307}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - TFL/TFLR,/REM Tests/High-Level-Tests/Auto Sanity/TFLR,Medium,michelleh,tzipiw,Sanity review on FPA Probes,TFL,Automated,1-Not started,"[{""id"":1242047,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171306}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - CW,/REM Tests/High-Level-Tests/Auto Sanity/CW & SB,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Crosswalk,Automated,1-Not started,"[{""id"":1242046,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171305}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - LM,/REM Tests/High-Level-Tests/Auto Sanity/LM,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Lane_Mark,Automated,1-Not started,"[{""id"":1242045,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171304}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - RE,/REM Tests/High-Level-Tests/Auto Sanity/RE,Medium,michelleh,tzipiw,Sanity review on FPA Probes,Road_Edge,Automated,1-Not started,"[{""id"":1242044,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171303}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - DP,/REM Tests/High-Level-Tests/Auto Sanity/DP,Medium,michelleh,tzipiw,Sanity review on FPA Probes,DP,Automated,1-Not started,"[{""id"":1242043,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171302}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Auto Sanity - Creation Statistics,/REM Tests/High-Level-Tests/Auto Sanity/Creation Statistics,Medium,michelleh,tzipiw,Sanity review on FPA Probes,DP,Automated,1-Not started,"[{""id"":1242042,""index"":1,""fields"":{""Action"":""Sanity review on FPA Probes"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171301}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - Road Type,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test Road Type V2V Events,Road_Type,Automated,1-Not started,"[{""id"":1242041,""index"":1,""fields"":{""Action"":""Manual test Road Type V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171300}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - TFL Cluster,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test TFL Cluster V2V Events,TFL,Automated,1-Not started,"[{""id"":1242040,""index"":1,""fields"":{""Action"":""Manual test TFL Cluster V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171299}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - CW,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test CW V2V Events,Crosswalk,Automated,1-Not started,"[{""id"":1242039,""index"":1,""fields"":{""Action"":""Manual test CW V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171298}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - SB,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test SB V2V Events,Speed_Bump,Automated,1-Not started,"[{""id"":1242038,""index"":1,""fields"":{""Action"":""Manual test SB V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171297}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - CW Priority,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test CW Priority V2V Events,CW_Priority,Automated,1-Not started,"[{""id"":1242037,""index"":1,""fields"":{""Action"":""Manual test CW Priority V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171296}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - DPSP,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test DPSP V2V Events,DPSP,Automated,1-Not started,"[{""id"":1242036,""index"":1,""fields"":{""Action"":""Manual test DPSP V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171295}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - TFLR,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test TFLR V2V Events,TFLR,Automated,1-Not started,"[{""id"":1242035,""index"":1,""fields"":{""Action"":""Manual test TFL/TFLR V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171294}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - RE type,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test RE type V2V Events,RE_Type,Automated,1-Not started,"[{""id"":1242034,""index"":1,""fields"":{""Action"":""Manual test Lane type V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171293}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - LM type,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test LM type V2V Events,LM_Type,Automated,1-Not started,"[{""id"":1242033,""index"":1,""fields"":{""Action"":""Manual test Lane type V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171292}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - LM,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test LM V2V Events,Lane_Mark,Automated,1-Not started,"[{""id"":1242032,""index"":1,""fields"":{""Action"":""Manual test LM V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171291}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - RE,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test RE V2V Events,Road_Edge,Automated,1-Not started,"[{""id"":1242031,""index"":1,""fields"":{""Action"":""Manual test RE V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171290}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - DP,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test DP V2V Events,DP,Automated,1-Not started,"[{""id"":1242030,""index"":1,""fields"":{""Action"":""Manual test DP V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171289}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Review Manual Events - Geo,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,Manual test Geo V2V Events,Geometry,Automated,1-Not started,"[{""id"":1242029,""index"":1,""fields"":{""Action"":""Manual test Geo V2V Events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171288}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
[Setup] Tag Manual Full Events in Nevo,/REM Tests/High-Level-Tests/Manual Full,Medium,halimaa,tzipiw,[Manual Full] Tag All Manual Events in Nevo,Multiple,Automated,1-Not started,"[{""id"":1242028,""index"":1,""fields"":{""Action"":""Tag Full Manual Events"",""Data"":"""",""Expected Result"":""TBD""},""attachments"":[],""testVersionId"":171287}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,V2V,Manual,
Manual Sanity Review - DP,/REM Tests/High-Level-Tests/Manual Sanity,Medium,michelleh,tzipiw,"Main scope - to find showstoppers.

Shortly review tagged events and document your findings.",DP,Automated,1-Not started,"[{""id"":1242027,""index"":1,""fields"":{""Action"":""Review manual events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171286}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Sanity,Manual,
Manual Sanity Review- RE,/REM Tests/High-Level-Tests/Manual Sanity,Medium,michelleh,tzipiw,"Main scope - to find showstoppers.

Shortly review tagged events and document your findings.",Road_Edge,Automated,1-Not started,"[{""id"":1242026,""index"":1,""fields"":{""Action"":""Review manual events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171285}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Sanity,Manual,
Manual Sanity Review - LM,/REM Tests/High-Level-Tests/Manual Sanity,Medium,michelleh,tzipiw,"Main scope - to find showstoppers.

Shortly review tagged events and document your findings.",Lane_Mark,Automated,1-Not started,"[{""id"":1242025,""index"":1,""fields"":{""Action"":""Quick manual review on LM objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171284}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Sanity,Manual,
Manual Sanity Review - General Map,/REM Tests/High-Level-Tests/Manual Sanity,Medium,michelleh,tzipiw,"Main scope - to find showstoppers.

Shortly review tagged events and document your findings.",Multiple,Automated,1-Not started,"[{""id"":1242024,""index"":1,""fields"":{""Action"":""Review manual events"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171283}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Sanity,Manual,
[Setup] Tag Manual Sanity Events in Nevo,/REM Tests/High-Level-Tests/Manual Sanity,Medium,halimaa,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242023,""index"":1,""fields"":{""Action"":""Quick manual review on LM objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171282}]",Detroit,IL_HW,JLM,Manhettan,Munich,Paris,TLV,Tokyo,Sanity,Manual,
[JLM] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242022,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171281}]",JLM,,,,,,,,Smoke,Manual,
[IL_HW] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242021,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171280}]",IL_HW,,,,,,,,Smoke,Manual,
[Manhettan] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242020,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171279}]",Manhettan,,,,,,,,Smoke,Manual,
[TLV] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242019,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171278}]",TLV,,,,,,,,Smoke,Manual,
[Munich] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242018,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171277}]",Munich,,,,,,,,Smoke,Manual,
[Paris] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242017,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171276}]",Paris,,,,,,,,Smoke,Manual,
[Detroit] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'",Multiple,Automated,1-Not started,"[{""id"":1242016,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171275}]",Detroit,,,,,,,,Smoke,Manual,
[Tokyo] Manual Smoke test,/REM Tests/High-Level-Tests/Manual Smoke,Medium,michelleh,tzipiw,"Quick manual review of each available map (object existence in junctions and main roads), looking for Zero Order issues - examples from the past - Significant DP holes all over the map, RE miss in large sections of the maps, Missing objects from the maps etc'

 

For Tokyo map - make sure we can view the map in MM, for 3D support.",Multiple,Automated,1-Not started,"[{""id"":1242015,""index"":1,""fields"":{""Action"":""Quick manual review on DP objects, looking for Zero Order issues"",""Data"":"""",""Expected Result"":""No Significant issues""},""attachments"":[],""testVersionId"":171274}]",Tokyo,,,,,,,,Smoke,Manual,
`;

/**
 * A robust CSV parser that handles quoted fields, multi-line fields, and escaped quotes.
 * It also creates unique headers for duplicate column names.
 * @param csv The raw CSV string.
 * @returns An array of objects, where each object represents a row.
 */
function parseCsv(csv: string): Record<string, string>[] {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let field = '';
    let inQuotes = false;

    // Normalize line endings and remove BOM if present
    csv = csv.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];

        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < csv.length && csv[i + 1] === '"') {
                    field += '"'; // Escaped quote
                    i++; // Skip next quote
                } else {
                    inQuotes = false; // End of quoted field
                }
            } else {
                field += char;
            }
        } else {
            if (char === ',') {
                currentRow.push(field);
                field = '';
            } else if (char === '\n') {
                currentRow.push(field);
                rows.push(currentRow);
                field = '';
                currentRow = [];
            } else if (char === '"' && field === '') {
                inQuotes = true;
            } else {
                field += char;
            }
        }
    }
    // Final push for last line
    if (field || currentRow.length > 0) {
        currentRow.push(field);
        rows.push(currentRow);
    }
    
    const nonEmptyRows = rows.filter(row => row.length > 1 || (row.length === 1 && row[0].trim() !== ''));

    if (nonEmptyRows.length < 2) return [];

    const rawHeaders = nonEmptyRows.shift()!.map(h => h.trim());
    const uniqueHeaders: string[] = [];
    const headerCounts: Record<string, number> = {};
    rawHeaders.forEach(h => {
        if (headerCounts[h]) {
            headerCounts[h]++;
            uniqueHeaders.push(`${h}_${headerCounts[h]}`);
        } else {
            headerCounts[h] = 1;
            uniqueHeaders.push(h);
        }
    });

    return nonEmptyRows.map(row => {
        const rowData: Record<string, string> = {};
        uniqueHeaders.forEach((h, i) => {
            rowData[h] = (row[i] || '').trim();
        });
        return rowData;
    });
}


const processCsvData = () => {
    const folders: Omit<Folder, 'children' | 'tests'>[] = [];
    const tests: Test[] = [];
    const users: User[] = [];
    const maps = new Set<string>();

    const folderPathMap = new Map<string, string>();
    const userNameMap = new Map<string, string>();

    function getOrCreateFolderId(path: string): string {
        if (!path) return '';
        const cleanPath = path.trim();
        if (folderPathMap.has(cleanPath)) {
            return folderPathMap.get(cleanPath)!;
        }

        const parts = cleanPath.split('/').filter(p => p);
        let currentPath = '';
        let parentId: string | null = null;

        for (const part of parts) {
            currentPath += `/${part}`;
            if (!folderPathMap.has(currentPath)) {
                const newId = `f-${folders.length + 1}`;
                folders.push({
                    id: newId,
                    name: part,
                    parentId: parentId,
                    path: currentPath,
                });
                folderPathMap.set(currentPath, newId);
            }
            parentId = folderPathMap.get(currentPath)!;
        }
        return parentId!;
    }
    
    function getOrCreateUserId(displayName: string): string | undefined {
        if (!displayName) return undefined;
        const lowerName = displayName.toLowerCase().trim();
        if (userNameMap.has(lowerName)) {
            return userNameMap.get(lowerName)!;
        }
        const newId = `user-${users.length + 1}`;
        const newUser: User = {
            id: newId,
            displayName: displayName.trim(),
            email: `${lowerName.replace(/\s+/g, '.')}@example.com`
        };
        users.push(newUser);
        userNameMap.set(lowerName, newId);
        return newId;
    }

    const jsonData = parseCsv(csvData.trim());

    jsonData.forEach((rowData, index) => {
        const folderPath = rowData['Test Repository Path'];
        const folderId = getOrCreateFolderId(folderPath);
        if (!folderId) return; // Skip tests without a valid folder path

        const labels: string[] = [];
        if (rowData['Developer Test Type']) labels.push(rowData['Developer Test Type']);
        if (rowData['Test Type']) labels.push(rowData['Test Type']);
        if (rowData['Development status']) labels.push(rowData['Development status']);
        
        const environments: string[] = [];
        for (const key in rowData) {
            if (key.startsWith('Test Environments') && rowData[key]) {
                environments.push(rowData[key]);
                maps.add(rowData[key]);
            }
        }
        labels.push(...environments);
        const map = environments[0] || undefined;

        const steps: TestStep[] = [];
        try {
            const stepsJson = rowData['Manual Test Steps'];
            if(stepsJson && stepsJson.startsWith("[{")) {
                 const rawSteps = JSON.parse(stepsJson);
                 if (Array.isArray(rawSteps)) {
                    rawSteps.forEach((s: any) => {
                        steps.push({
                            step_no: s.index || steps.length + 1,
                            action: s.fields?.Action || '',
                            expected: s.fields?.['Expected Result'] || ''
                        });
                    });
                }
            }
        } catch (e) {
            console.warn(`Could not parse steps for test "${rowData['Summary']}":`, e);
        }

        let priority: Priority;
        switch (rowData['Priority']?.toLowerCase()) {
            case 'high': priority = Priority.P1; break;
            case 'medium': priority = Priority.P2; break;
            case 'low': priority = Priority.P3; break;
            default: priority = Priority.P2;
        }

        const creatorName = rowData['Creator'];
        getOrCreateUserId(creatorName);
        getOrCreateUserId(rowData['Assignee']);

        const newTest: Test = {
            id: `t-csv-${index + 1}`,
            name: rowData['Summary'] || 'Untitled Test',
            folderId: folderId,
            status: TestStatus.ACTIVE,
            description: rowData['Description'] || '',
            steps: steps,
            labels: [...new Set(labels.filter(Boolean))],
            priority: priority,
            affectedObjectType: rowData['Affected Object Type'],
            testMethod: rowData['Test Method'],
            estimated_duration_sec: 60,
            updatedAt: new Date().toLocaleDateString(),
            updatedBy: creatorName,
            map: map,
        };
        tests.push(newTest);
    });

    return { folders, tests, users, maps: Array.from(maps).sort() };
};

const parsedData = processCsvData();

export const mockFolders = parsedData.folders;
export const mockTests = parsedData.tests;
export const mockUsers = parsedData.users;
export const mockMaps = parsedData.maps;
export const mockConfigurations: string[] = ['Standard', 'High-Performance', 'Low-Power', 'Debug'];

export const mockCycles: Cycle[] = [
  { 
    id: 'c-1', 
    name: 'Release 2.5 Smoke Test', 
    description: 'Smoke testing for the upcoming v2.5 release.', 
    status: CycleStatus.ACTIVE, 
    labels: ['release', 'smoke'], 
    updatedAt: '2023-10-29',
    version: '2.5.0',
    refVersion: '2.4.1',
    cycleType: CycleType.SMOKE,
    mapsInfo: [
      { mapName: 'Tokyo', link: 'http://maps.example.com/tokyo' },
      { mapName: 'Detroit', link: 'http://maps.example.com/detroit' }
    ]
  },
  { 
    id: 'c-2', 
    name: 'Q4 Regression - Frontend', 
    description: 'Full regression pass on the frontend application.', 
    status: CycleStatus.CLOSED, 
    labels: ['regression'], 
    updatedAt: '2023-10-20',
    version: '2.4.0',
    refVersion: '2.3.5',
    cycleType: CycleType.REGRESSION,
    mapsInfo: []
  },
  { 
    id: 'c-3', 
    name: 'Next Sprint Features', 
    description: 'Testing for features in the next development sprint.', 
    status: CycleStatus.DRAFT, 
    labels: ['sprint-planning'], 
    updatedAt: '2023-10-28',
    version: '2.6.0-alpha',
    refVersion: '2.5.0',
    cycleType: CycleType.NEW_FEATURE,
    mapsInfo: []
  },
];

export const mockScopes: Scope[] = [
  { id: 's-1', cycleId: 'c-1', name: ScopeName.MEPY_SMOKE },
  { id: 's-2', cycleId: 'c-1', name: ScopeName.SASA },
  { id: 's-3', cycleId: 'c-2', name: ScopeName.NONE },
  { id: 's-4', cycleId: 'c-3', name: ScopeName.NONE },
];


export const mockCycleItems: CycleItem[] = [
  // Cycle 1
  { id: 'ci-1', cycleId: 'c-1', scopeId: 's-1', testId: 't-csv-1', testSnapshot: { name: mockTests[0].name, steps: mockTests[0].steps, labels: mockTests[0].labels, affectedObjectType: mockTests[0].affectedObjectType, testMethod: mockTests[0].testMethod }, assigneeId: 'user-1', result: CycleItemResult.PASSED, updatedAt: '2023-10-29', map: 'Tokyo', configuration: 'Standard' },
  { id: 'ci-2', cycleId: 'c-1', scopeId: 's-1', testId: 't-csv-2', testSnapshot: { name: mockTests[1].name, steps: mockTests[1].steps, labels: mockTests[1].labels, affectedObjectType: mockTests[1].affectedObjectType, testMethod: mockTests[1].testMethod }, assigneeId: 'user-2', result: CycleItemResult.FAILED, updatedAt: '2023-10-29', map: 'Detroit', configuration: 'High-Performance' },
  { id: 'ci-3', cycleId: 'c-1', scopeId: 's-2', testId: 't-csv-3', testSnapshot: { name: mockTests[2].name, steps: mockTests[2].steps, labels: mockTests[2].labels, affectedObjectType: mockTests[2].affectedObjectType, testMethod: mockTests[2].testMethod }, assigneeId: 'user-3', result: CycleItemResult.NOT_RUN, updatedAt: '2023-10-29', map: 'Paris', configuration: 'Debug' },
  // Cycle 2
  { id: 'ci-4', cycleId: 'c-2', scopeId: 's-3', testId: 't-csv-4', testSnapshot: { name: mockTests[3].name, steps: mockTests[3].steps, labels: mockTests[3].labels, affectedObjectType: mockTests[3].affectedObjectType, testMethod: mockTests[3].testMethod }, assigneeId: 'user-1', result: CycleItemResult.PASSED, updatedAt: '2023-10-19', map: 'Manhattan', configuration: 'Standard' },
  { id: 'ci-5', cycleId: 'c-2', scopeId: 's-3', testId: 't-csv-5', testSnapshot: { name: mockTests[4].name, steps: mockTests[4].steps, labels: mockTests[4].labels, affectedObjectType: mockTests[4].affectedObjectType, testMethod: mockTests[4].testMethod }, assigneeId: 'user-2', result: CycleItemResult.PASSED, updatedAt: '2023-10-19', map: 'JLM', configuration: 'Standard' },
  { id: 'ci-6', cycleId: 'c-2', scopeId: 's-3', testId: 't-csv-6', testSnapshot: { name: mockTests[5].name, steps: mockTests[5].steps, labels: mockTests[5].labels, affectedObjectType: mockTests[5].affectedObjectType, testMethod: mockTests[5].testMethod }, assigneeId: 'user-3', result: CycleItemResult.BLOCKED, updatedAt: '2023-10-20', map: 'TLV', configuration: 'High-Performance' },
];

export const buildFolderTree = (folders: Omit<Folder, 'children' | 'tests'>[], tests: Test[]): Folder[] => {
    const folderMap: Record<UUID, Folder> = {};
    const rootFolders: Folder[] = [];

    folders.forEach(f => {
        folderMap[f.id] = { ...f, children: [], tests: [] };
    });
    
    tests.forEach(t => {
        if(folderMap[t.folderId]){
            folderMap[t.folderId].tests.push(t);
        }
    });

    folders.forEach(f => {
        if (f.parentId && folderMap[f.parentId]) {
            folderMap[f.parentId].children.push(folderMap[f.id]);
        } else {
            rootFolders.push(folderMap[f.id]);
        }
    });
    
    // Sort children folders alphabetically
    Object.values(folderMap).forEach(folder => {
        folder.children.sort((a, b) => a.name.localeCompare(b.name));
    });
    
    rootFolders.sort((a, b) => a.name.localeCompare(b.name));

    return rootFolders;
};