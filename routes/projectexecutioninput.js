const express = require('express');
const router = express.Router();
const client = require('../database/db');
const csv = require('fast-csv');
const Promise = require('bluebird');
const projectexecutioninput = require('../data/projectexecutioninput.json');

/*
 * Sample ping API.
 */

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

/*
 * GET 10 Records.
 */

router.get('/getdata', function (req, res) {
    client.execute("SELECT * FROM projectexecutioninput4 LIMIT 10", function (err, result) {
        if (!err) {
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                console.log("No results");
                res.status(404).send({ msg: err });
            }
        }
    });
});
/*

router.post('/save', (req, res) => {
        
        var data = JSON.parse(JSON.stringify(req.body));
        console.log("data.ProjectExecutionInputID:",req.body);

        var query = 'INSERT INTO componentexecutionlogs.ProjectExecutionInput1 (ProjectExecutionInputID , ProcessExecutionLogID,'+ 
        'Bank_Acc_Type, Email_Valid, Bank_KF_Own, Suburb, Email_15_Other, Eppix_Lim,' +
        'ID_KF_Other, Pre_Vet_Lim, IsExistingClient , Gender , Roam_Data_Spend , DOB ,' +
        'Location_Locale_HF , Currency , WorkTel_7_CrossRef_Own ,Auto_Decis_Lim,Bureau_Enq_7D,' +
        'CoExistenceIndicator, HomeTel_KF_Own,HANIS_Passed ,Email_Domain_HF, Ref_Branch_HF ,' +
        'HANIS_Attempts , Ref_OffBase_AD , SAFPS_ID_CONFIRMED , KBA_Result , SAFPS_ID_Suspect ,' +
        'Employer ,Phys_Add_Incorrect ,Recurring_Charge ,Average_Spend ,Ave_OOB_Spend ,Initials ,' +
        'AddressLine2 ,Perc_Act_Sub_ID ,AddressLine1 ,CL_Analysis_A ,Cust_Type ,Qualification ,' +
        'ODM_Random_Number ,Perc_Hand_Charge_ID ,Cell_Active ,Marital_30_Own_Other ,Ref_OnBase_AD ,' +
        'Upper_Cred_Lim_max ,Cell_Recent_Bureau_Mismatch ,Country ,Auto_Decis_Flag ,Bank_Active , '+
        'Email_Recent_Bureau_Mismatch ,Roaming_Spend ,WorkTel_KF_Other ,Email_KF_Own ,Del_Add_KF_Other,' +
        'Upper_Cred_Lim ,Customer_Accounts ,ID_Deceased ,Post_Add_30D ,HomeTelephoneCode , '+
        'BankAcc_Same90_OWN ,Cell_Bureau_Mismatch ,Number_Payments_Ever_SACRRA ,Income_Incr_20_Other , '+ 
        'APP_Application_Number ,Perc_Act_Sub_ACC ,Perc_Hand_ACC ,Ave_Roaming_Spend ,Bank_ID_Match , ' +
        'WorkTel_KF_Own ,CurrentOrder_List ,Eppix_Credit_Limit ,Nr_sub_ID ,Cell_HF ,FirstName , '+ 
        'BranchAcc_Same90_OTHER ,Nationality ,Perc_Hand_ID ,Occupation ,SAFPS_ID_VICTIM , ' + 
        'HomeTel_30_CrossRef_Own ,PortIn ,Bank_Name ,Cust_Class ,WorkTelephoneNumber , ' +
        'Bank_15_Own ,Bank_15_Other ,Existing_Cust_Exposure ,KBA_Attempts ,CellNumber ,Surname ,' +
        'Unbilled_Usage ,IdentityNumber ,Roam_SMS_Spend ,Location_Locale_RSA ,Bank_Account_Number ,' +
        'Bank_KF_Other ,Ref_User_HF ,ID_HF ,Tot_VAT ,HomeTel_KF_Other ,Device_Masked ,Nr_sub_ACC ,Phys_Add_30D ,' +
        'AddSim_Switch ,Cell_Ring_Fenced ,HomeTel_Business ,IDType ,Number_Payments_90D_SACRRA ,BankCode_Same90_OTHER ,' +
        'Avg_OOB_Spend ,Cell_Bureau_Register ,Local_Voice_Spend ,SPUL ,ID_Verified ,Cell_30_CrossRef_Own , ' +
        'Device_HF , ID_Surname_Match ,ID_7_Own ,Email_HF ,Del_Add_30D ,Bank_3Months ,HomeTelephoneNumber ,' +
        'Email_15_Own ,Cell_60_Own ,APP_Channel ,Cell_Same90_Other ,Device_7_Total_Own ,Phys_Add_30D_ID ,' +
        'City ,Cell_Same90_Own ,Perc_Hand_Charge_ACC ,ID_Issued ,BankCode_Same90_OWN ,Local_SMS_Spend ,' +
        'Random_Number ,Contact_HF ,HomeTel_Same90_Other ,WorkTel_Same90_Other ,Bank_Found ,App_Type ,' + 
        'Local_Data_Spend ,Risk_Exposure ,Eppix_Cred_Class ,Dealer_Restriction_Flag ,Email_Ring_Fenced ,'+
        'Marital_Status ,APP_Application_Date ,Email_KF_Other ,OutOfBundle_List,PostalCode , WorkTel_Same90_Own ,' +
        'Income_T150 ,Income_Incr_10_Other ,Email_Bureau_Mismatch ,Employment ,Marital_90_Other,ID_SA_Citizen , ' +
        'Decision_Call_Type ,Income_Incr_20_Own ,Bank_HF ,Del_Add_KF_Own ,Num_Years_At_Employer,ID_KF_Own , '+
        'Contact_Valid ,Additional_Inc_List,Location_PCode_HF ,Title ,Bank_Debits ,HomeTel_Same90_Own , ' +
        'OpenOrder_List,WorkTelephoneCode ,Gross_Inc ,Phys_Add_HF ,Marital_90_Own ,Subscription_Val ,' +
        'Cell_SIM_Swap ,Bank_Branch_Code ,Tot_Billed_Amounts ,OOB_Spend ,Cell_KF_Own ,FMP_ID_SA_Citizen ,' +
        'Cell_3Months ,Location_HF ,Cell_15_Own ,Roam_Voice_Spend,Acc_Type ,ProductID ,ProductCategoryID ,' +
        'VersionNumber , OCB_FinalScore' +
        ') VALUES(?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' + 
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,'+
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' + 
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,'+
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
            '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?)';
            

        const params = [data.projectexecutioninputid ,data.ProcessExecutionLogID,
            data.Bank_Acc_Type,data.Email_Valid,data.Bank_KF_Own,data.Suburb,data.Email_15_Other,data.Eppix_Lim,
            data.ID_KF_Other,data.Pre_Vet_Lim,data.IsExistingClient ,data.Gender ,data.Roam_Data_Spend ,data.DOB ,
            data.Location_Locale_HF ,data.Currency ,data.WorkTel_7_CrossRef_Own ,data.Auto_Decis_Lim,data.Bureau_Enq_7D,
            data.CoExistenceIndicator,data.HomeTel_KF_Own,data.HANIS_Passed ,data.Email_Domain_HF,data.Ref_Branch_HF ,
            data.HANIS_Attempts ,data.Ref_OffBase_AD ,data.SAFPS_ID_CONFIRMED ,data.KBA_Result ,data.SAFPS_ID_Suspect ,
            data.Employer ,data.Phys_Add_Incorrect ,data.Recurring_Charge ,data.Average_Spend ,data.Ave_OOB_Spend ,data.Initials ,
            data.AddressLine2 ,data.Perc_Act_Sub_ID ,data.AddressLine1 ,data.CL_Analysis_A ,data.Cust_Type ,data.Qualification ,
            data.ODM_Random_Number ,data.Perc_Hand_Charge_ID ,data.Cell_Active ,data.Marital_30_Own_Other ,data.Ref_OnBase_AD ,
            data.Upper_Cred_Lim_max ,data.Cell_Recent_Bureau_Mismatch ,data.Country ,data.Auto_Decis_Flag ,data.Bank_Active , 
            data.Email_Recent_Bureau_Mismatch ,data.Roaming_Spend ,data.WorkTel_KF_Other ,data.Email_KF_Own ,data.Del_Add_KF_Other,
            data.Upper_Cred_Lim ,data.Customer_Accounts ,data.ID_Deceased ,data.Post_Add_30D ,data.HomeTelephoneCode ,
            data.BankAcc_Same90_OWN ,data.Cell_Bureau_Mismatch ,data.Number_Payments_Ever_SACRRA ,data.Income_Incr_20_Other ,  
            data.APP_Application_Number ,data.Perc_Act_Sub_ACC ,data.Perc_Hand_ACC ,data.Ave_Roaming_Spend ,data.Bank_ID_Match ,
            data.WorkTel_KF_Own ,data.CurrentOrder_List ,data.Eppix_Credit_Limit ,data.Nr_sub_ID ,data.Cell_HF ,data.FirstName ,  
            data.BranchAcc_Same90_OTHER ,data.Nationality ,data.Perc_Hand_ID ,data.Occupation ,data.SAFPS_ID_VICTIM ,
            data.HomeTel_30_CrossRef_Own ,data.PortIn ,data.Bank_Name ,data.Cust_Class ,data.WorkTelephoneNumber ,
            data.Bank_15_Own ,data.Bank_15_Other ,data.Existing_Cust_Exposure ,data.KBA_Attempts ,data.CellNumber ,data.Surname ,
            data.Unbilled_Usage ,data.IdentityNumber ,data.Roam_SMS_Spend ,data.Location_Locale_RSA ,data.Bank_Account_Number ,
            data.Bank_KF_Other ,data.Ref_User_HF ,data.ID_HF ,data.Tot_VAT ,data.HomeTel_KF_Other ,data.Device_Masked ,data.Nr_sub_ACC ,data.Phys_Add_30D ,
            data.AddSim_Switch ,data.Cell_Ring_Fenced ,data.HomeTel_Business ,data.IDType ,data.Number_Payments_90D_SACRRA ,data.BankCode_Same90_OTHER ,
            data.Avg_OOB_Spend ,data.Cell_Bureau_Register ,data.Local_Voice_Spend ,data.SPUL ,data.ID_Verified ,data.Cell_30_CrossRef_Own , 
            data.Device_HF ,data.ID_Surname_Match ,data.ID_7_Own ,data.Email_HF ,data.Del_Add_30D ,data.Bank_3Months ,data.HomeTelephoneNumber ,
            data.Email_15_Own ,data.Cell_60_Own ,data.APP_Channel ,data.Cell_Same90_Other ,data.Device_7_Total_Own ,data.Phys_Add_30D_ID ,
            data.City ,data.Cell_Same90_Own ,data.Perc_Hand_Charge_ACC ,data.ID_Issued ,data.BankCode_Same90_OWN,data.Local_SMS_Spend ,
            data.Random_Number ,data.Contact_HF ,data.HomeTel_Same90_Other ,data.WorkTel_Same90_Other ,data.Bank_Found ,data.App_Type , 
            data.Local_Data_Spend ,data.Risk_Exposure ,data.Eppix_Cred_Class ,data.Dealer_Restriction_Flag ,data.Email_Ring_Fenced ,
            data.Marital_Status ,data.APP_Application_Date ,data.Email_KF_Other ,data.OutOfBundle_List,data.PostalCode ,data.WorkTel_Same90_Own ,
            data.Income_T150 ,data.Income_Incr_10_Other ,data.Email_Bureau_Mismatch ,data.Employment ,data.Marital_90_Other,data.ID_SA_Citizen , 
            data.Decision_Call_Type ,data.Income_Incr_20_Own ,data.Bank_HF ,data.Del_Add_KF_Own ,data.Num_Years_At_Employer,data.ID_KF_Own ,
            data.Contact_Valid ,data.Additional_Inc_List,data.Location_PCode_HF ,data.Title ,data.Bank_Debits ,data.HomeTel_Same90_Own , 
            data.OpenOrder_List,data.WorkTelephoneCode ,data.Gross_Inc ,data.Phys_Add_HF ,data.Marital_90_Own ,data.Subscription_Val ,
            data.Cell_SIM_Swap ,data.Bank_Branch_Code ,data.Tot_Billed_Amounts ,data.OOB_Spend ,data.Cell_KF_Own ,data.FMP_ID_SA_Citizen ,
            data.Cell_3Months ,data.Location_HF ,data.Cell_15_Own ,data.Roam_Voice_Spend,data.Acc_Type ,data.ProductID ,data.ProductCategoryID ,
            data.VersionNumber ,data.OCB_FinalScore];
        

        //const params = ["1","NewAccount",null,"61OxfordCourt","Hoffman","ON",20180408,"7614","Online","New","Accept",34575,778.8900146484375,578.219970703125,4194.47998046875,12652.240234375,0,0,1,"Retirementaccounts","1000008583",1,"580105",1,1,0,1,0,0,"Investec",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"4171585871","Johannesburg",null,"Legacy",0,1,"SouthAfrica","ZAR",null,"Normal","Consumer",null,0,"PreVet",0,0,0,0,0,0,1978,0,0,0,0,0,0,0,0,0,1,"Ham","Professional","EXCEL",797,5716,224241.015625,"Wendell",1,"Male",26125,0,1,0,0,0,0,0,0,"27","4133551101",0,0,0,0,0,0,1,1,1,"6.91224E+12","SAID",0,0,0,0,"W","N",0,1,324.5199890136719,1053.469970703125,1053.469970703125,0,0,1,0,0,0,0,"MarriedCommunityofProperty","SouthAfrican",3,5,"19",0,0,null,"Semi-Professional",43,11205.900390625,null,null,93.72000122070312,1.8200000524520874,85.45999908447266,15.15999984741211,19.360000610351562,33.02000045776367,0,0,0,0,1,0,"4750",50486,"103972","0","2","Degree",43,298.7300109863281,0,0,0,0,12704.1201171875,858.0800170898438,2274.35009765625,4982.85009765625,1159.77001953125,0,0,0,30,933.469970703125,"Meadowridge","MYANGA","MEJ",76246.59375,4823.1201171875,2453.300048828125,62963,36937,"1",0,0,0,0,0,"27","4149213881"];
        
        client.execute(query, params,
            {
                hints: [
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null, null, null, null, null, null, null, null, null,
                        null, null
                ]}, function(err, result){
            if(err){
                console.log('err 121:', err);
                res.status(404).send({msg: err});
            } else {
                console.log('customers: add succ:');
                //res.statusCode(204);
            }
        });

        // const query = 'INSERT INTO users (key, name, email, birthdate) VALUES (?, ?, ?)';
        // const params = ['mick-jagger', 'Sir Mick Jagger', 'mick@rollingstones.com', new Date(1943, 6, 26)];
        // client.execute(query, params, { prepare: true }, function (err) {
        // assert.ifError(err);
        // //Inserted in the cluster
        // });
});*/

router.post('/save', (req, res) => {

    //var data = JSON.parse(JSON.stringify(req.body[0]));
    var data = req.body[0];
    
    var query = 'INSERT INTO componentexecutionlogs.projectexecutioninput4 (' +
        'projectexecutioninputid, processexecutionlogid , bank_acc_type, email_valid,' +
        'bank_kf_own, suburb, email_15_other, eppix_lim, id_kf_other , pre_vet_lim,' +
        'isexistingclient, gender, roam_data_spend, dob, location_locale_hf, currency,' +
        'worktel_7_crossref_own, auto_decis_lim, bureau_enq_7d, coexistenceindicator,' +
        'hometel_kf_own, hanis_passed, email_domain_hf, ref_branch_hf, hanis_attempts,' +
        'ref_offbase_ad, safps_id_confirmed, kba_result, safps_id_suspect, employer,' +
        'phys_add_incorrect, recurring_charge, average_spend, ave_oob_spend, initials,' +
        'addressline2, perc_act_sub_id, addressline1, cl_analysis_a, cust_type, qualification,' +
        'odm_random_number, perc_hand_charge_id, cell_active, marital_30_own_other,' +
        'ref_onbase_ad, upper_cred_lim_max, cell_recent_bureau_mismatch, country,' +
        'auto_decis_flag, bank_active, email_recent_bureau_mismatch, roaming_spend,' +
        'worktel_kf_other, email_kf_own, del_add_kf_other, upper_cred_lim, customer_accounts,' +
        'id_deceased, post_add_30d, hometelephonecode, bankacc_same90_own, cell_bureau_mismatch,' +
        'number_payments_ever_sacrra, income_incr_20_other, app_application_number,' +
        'perc_act_sub_acc, perc_hand_acc, ave_roaming_spend, bank_id_match, worktel_kf_own,' +
        'currentorder_list, eppix_credit_limit, nr_sub_id, cell_hf, firstname, branchacc_same90_other,' +
        'nationality, perc_hand_id, occupation, safps_id_victim, hometel_30_crossref_own, portin,' +
        'bank_name, cust_class, worktelephonenumber, bank_15_own, bank_15_other, existing_cust_exposure,' +
        'kba_attempts, cellnumber, surname, unbilled_usage, identitynumber, roam_sms_spend,' +
        'location_locale_rsa, bank_account_number, bank_kf_other, ref_user_hf, id_hf, tot_vat,' +
        'hometel_kf_other, device_masked, nr_sub_acc, phys_add_30d, addsim_switch, cell_ring_fenced,' +
        'hometel_business, idtype, number_payments_90d_sacrra, bankcode_same90_other, avg_oob_spend,' +
        'cell_bureau_register, local_voice_spend, spul, id_verified, cell_30_crossref_own, device_hf,' +
        'id_surname_match, id_7_own, email_hf, del_add_30d, bank_3months, hometelephonenumber,' +
        'email_15_own, cell_60_own, app_channel, cell_same90_other, device_7_total_own,' +
        'phys_add_30d_id, city, cell_same90_own, perc_hand_charge_acc, id_issued, bankcode_same90_own,' +
        'local_sms_spend, random_number, contact_hf, hometel_same90_other, worktel_same90_other,' +
        'bank_found, app_type, local_data_spend, risk_exposure, eppix_cred_class, dealer_restriction_flag,' +
        'email_ring_fenced, marital_status, app_application_date, email_kf_other, outofbundle_list,' +
        'postalcode, worktel_same90_own, income_t150, income_incr_10_other, email_bureau_mismatch,' +
        'employment, marital_90_other, id_sa_citizen, decision_call_type, income_incr_20_own,' +
        'bank_hf, del_add_kf_own, num_years_at_employer, id_kf_own, contact_valid, additional_inc_list,' +
        'location_pcode_hf, title, bank_debits, hometel_same90_own, openorder_list, worktelephonecode,' +
        'gross_inc, phys_add_hf, marital_90_own, subscription_val, cell_sim_swap, bank_branch_code,' +
        'tot_billed_amounts, oob_spend, cell_kf_own, fmp_id_sa_citizen, cell_3months, location_hf,' +
        'cell_15_own, roam_voice_spend, acc_type, productid, productcategoryid,' +
        'versionnumber, ocb_finalscore' +
        ') VALUES(?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?,' +
        '?, ?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?)';

    const params = [data.ProjectExecutionInputID, data.ProcessExecutionLogID,
    data.Bank_Acc_Type, data.Email_Valid, data.Bank_KF_Own, data.Suburb, data.Email_15_Other, data.Eppix_Lim,
    data.ID_KF_Other, data.Pre_Vet_Lim, data.IsExistingClient, data.Gender, data.Roam_Data_Spend, data.DOB,
    data.Location_Locale_HF, data.Currency, data.WorkTel_7_CrossRef_Own, data.Auto_Decis_Lim, data.Bureau_Enq_7D,
    data.CoExistenceIndicator, data.HomeTel_KF_Own, data.HANIS_Passed, data.Email_Domain_HF, data.Ref_Branch_HF,
    data.HANIS_Attempts, data.Ref_OffBase_AD, data.SAFPS_ID_CONFIRMED, data.KBA_Result, data.SAFPS_ID_Suspect,
    data.Employer, data.Phys_Add_Incorrect, data.Recurring_Charge, data.Average_Spend, data.Ave_OOB_Spend, data.Initials,
    data.AddressLine2, data.Perc_Act_Sub_ID, data.AddressLine1, data.CL_Analysis_A, data.Cust_Type, data.Qualification,
    data.ODM_Random_Number, data.Perc_Hand_Charge_ID, data.Cell_Active, data.Marital_30_Own_Other, data.Ref_OnBase_AD,
    data.Upper_Cred_Lim_max, data.Cell_Recent_Bureau_Mismatch, data.Country, data.Auto_Decis_Flag, data.Bank_Active,
    data.Email_Recent_Bureau_Mismatch, data.Roaming_Spend, data.WorkTel_KF_Other, data.Email_KF_Own, data.Del_Add_KF_Other,
    data.Upper_Cred_Lim, data.Customer_Accounts, data.ID_Deceased, data.Post_Add_30D, (data.HomeTelephoneCode).toString(),
    data.BankAcc_Same90_OWN, data.Cell_Bureau_Mismatch, data.Number_Payments_Ever_SACRRA, data.Income_Incr_20_Other,
    (data.APP_Application_Number).toString(), data.Perc_Act_Sub_ACC, data.Perc_Hand_ACC, data.Ave_Roaming_Spend, data.Bank_ID_Match,
    data.WorkTel_KF_Own, data.CurrentOrder_List, data.Eppix_Credit_Limit, data.Nr_sub_ID, data.Cell_HF, data.FirstName,
    data.BranchAcc_Same90_OTHER, data.Nationality, data.Perc_Hand_ID, data.Occupation, data.SAFPS_ID_VICTIM,
    data.HomeTel_30_CrossRef_Own, data.PortIn, data.Bank_Name, data.Cust_Class, (data.WorkTelephoneNumber).toString(),
    data.Bank_15_Own, data.Bank_15_Other, data.Existing_Cust_Exposure, data.KBA_Attempts, (data.CellNumber).toString(), data.Surname,
    data.Unbilled_Usage, (data.IdentityNumber).toString(), data.Roam_SMS_Spend, data.Location_Locale_RSA, (data.Bank_Account_Number).toString(),
    data.Bank_KF_Other, data.Ref_User_HF, data.ID_HF, data.Tot_VAT, data.HomeTel_KF_Other, data.Device_Masked, data.Nr_sub_ACC, data.Phys_Add_30D,
    data.AddSim_Switch, data.Cell_Ring_Fenced, data.HomeTel_Business, data.IDType, data.Number_Payments_90D_SACRRA, data.BankCode_Same90_OTHER,
    data.Avg_OOB_Spend, data.Cell_Bureau_Register, data.Local_Voice_Spend, data.SPUL, data.ID_Verified, data.Cell_30_CrossRef_Own,
    data.Device_HF, data.ID_Surname_Match, data.ID_7_Own, data.Email_HF, data.Del_Add_30D, data.Bank_3Months, (data.HomeTelephoneNumber).toString(),
    data.Email_15_Own, data.Cell_60_Own, data.APP_Channel, data.Cell_Same90_Other, data.Device_7_Total_Own, data.Phys_Add_30D_ID,
    data.City, data.Cell_Same90_Own, data.Perc_Hand_Charge_ACC, data.ID_Issued, data.BankCode_Same90_OWN, data.Local_SMS_Spend,
    data.Random_Number, data.Contact_HF, data.HomeTel_Same90_Other, data.WorkTel_Same90_Other, data.Bank_Found, data.App_Type,
    data.Local_Data_Spend, data.Risk_Exposure, data.Eppix_Cred_Class, data.Dealer_Restriction_Flag, data.Email_Ring_Fenced,
    data.Marital_Status, data.APP_Application_Date, data.Email_KF_Other, data.OutOfBundle_List, (data.PostalCode).toString(), data.WorkTel_Same90_Own,
    data.Income_T150, data.Income_Incr_10_Other, data.Email_Bureau_Mismatch, data.Employment, data.Marital_90_Other, data.ID_SA_Citizen,
    data.Decision_Call_Type, data.Income_Incr_20_Own, data.Bank_HF, data.Del_Add_KF_Own, (data.Num_Years_At_Employer).toString(), data.ID_KF_Own,
    data.Contact_Valid, data.Additional_Inc_List, data.Location_PCode_HF, data.Title, data.Bank_Debits, data.HomeTel_Same90_Own,
    data.OpenOrder_List, (data.WorkTelephoneCode).toString(), data.Gross_Inc, data.Phys_Add_HF, data.Marital_90_Own, data.Subscription_Val,
    data.Cell_SIM_Swap, data.Bank_Branch_Code, data.Tot_Billed_Amounts, data.OOB_Spend, data.Cell_KF_Own, data.FMP_ID_SA_Citizen,
    data.Cell_3Months, data.Location_HF, data.Cell_15_Own, data.Roam_Voice_Spend, data.Acc_Type, data.ProductID, data.ProductCategoryID,
    (data.VersionNumber).toString(), data.OCB_FinalScore
    ];
 
/*
    client.execute(query, params, {
        hints: [
            'bigint', 'bigint', 'text', 'int', 'int', 'text', 'int', 'int', 'int', 'int', 'text', 'text', 'float',
            'int', 'int', 'text', 'int', 'int', 'int', 'text', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int',
            'int', 'text', 'int', 'float', 'float', 'float', 'text', 'text', 'float', 'text', 'text', 'text', 'text',
            'int', 'float', 'int', 'int', 'int', 'int', 'int', 'text', 'text', 'int', 'int', 'float', 'int', 'int', 'int',
            'int', 'text', 'int', 'int', 'text', 'int', 'int', 'int', 'int', 'text', 'float', 'float', 'float', 'int', 'int',
            'text', 'float', 'int', 'int', 'text', 'int', 'text', 'float', 'text', 'int', 'int', 'int', 'text', 'text', 'text',
            'int', 'int', 'float', 'int', 'text', 'text', 'float', 'text', 'float', 'int', 'text', 'int', 'int', 'int', 'float',
            'int', 'int', 'int', 'int', 'text', 'int', 'int', 'text', 'int', 'int', 'float', 'int', 'float', 'float', 'int',
            'int', 'int', 'int', 'int', 'int', 'int', 'int', 'text', 'int', 'int', 'text', 'int', 'int', 'int', 'text', 'int', 'float',
            'int', 'int', 'float', 'int', 'int', 'int', 'int', 'int', 'text', 'float', 'float', 'text', 'int', 'int', 'text', 'int',
            'int', 'text', 'text', 'int', 'int', 'int', 'int', 'text', 'int', 'int', 'text', 'int', 'int', 'int', 'text', 'int', 'int',
            'text', 'int', 'text', 'int', 'int', 'text', 'text', 'int', 'int', 'int', 'float', 'int', 'text', 'float', 'float', 'int',
            'int', 'int', 'int', 'int', 'float', 'text', 'bigint', 'bigint', 'text', 'int'
        ]
    })
        .then(result => {
            res.sendStatus(204);
        })
        .catch(err => {
            console.log("err:", err);
            res.send(err);
        });
*/

    //const params = [1,'NewAccount',null,'61OxfordCourt',"Hoffman","ON",20180408,"7614","Online","New","Accept",34575,778.8900146484375,578.219970703125,4194.47998046875,12652.240234375,0,0,1,"Retirementaccounts","1000008583",1,"580105",1,1,0,1,0,0,"Investec",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"4171585871","Johannesburg",null,"Legacy",0,1,"SouthAfrica","ZAR",null,"Normal","Consumer",null,0,"PreVet",0,0,0,0,0,0,1978,0,0,0,0,0,0,0,0,0,1,"Ham","Professional","EXCEL",797,5716,224241.015625,"Wendell",1,"Male",26125,0,1,0,0,0,0,0,0,"27","4133551101",0,0,0,0,0,0,1,1,1,"6.91224E+12","SAID",0,0,0,0,"W","N",0,1,324.5199890136719,1053.469970703125,1053.469970703125,0,0,1,0,0,0,0,"MarriedCommunityofProperty","SouthAfrican",3,5,"19",0,0,null,"Semi-Professional",43,11205.900390625,null,null,93.72000122070312,1.8200000524520874,85.45999908447266,15.15999984741211,19.360000610351562,33.02000045776367,0,0,0,0,1,0,"4750",50486,"103972","0","2","Degree",43,298.7300109863281,0,0,0,0,12704.1201171875,858.0800170898438,2274.35009765625,4982.85009765625,1159.77001953125,0,0,0,30,933.469970703125,"Meadowridge","MYANGA","MEJ",76246.59375,4823.1201171875,2453.300048828125,62963,36937,"1",0,0,0,0,0,"27","4149213881"];

    client.execute(query, params, { prepare: true })
        .then(result => {
            console.log("result:",result);
            res.status(204);
        })
        .catch(err => {
            console.log("err:",err); 
            res.send(err);
        });

});

/*Save Employee*/
/* Used company database */

router.post('/saveemployee', (req, res) => {

    var input = JSON.parse(JSON.stringify(req.body));
    var query = 'INSERT INTO company.employee (emp_id, department, first_name, last_name, phone, projects, skills) VALUES (? , ?, ?, ?, ?, ?, ?)';
    var params = []
    client.execute(query, [22, 'IT', 'R', 'J', , , ,], { prepare: true })
        .then(result => {
            res.status(201);
        })
        .catch(err => {
            res.send(err);
        });
});



/* Read csv file from location*/
/* sample code to read csv from location 
 * and imported into employee table
 * Imported 20k records
 */ 

//working code
router.get('/importcsv', (req, res) => {
    console.log("Import csv file API calling !!!");
    
    var dataArr = [];
   
    csv.fromPath(__dirname + '/../data/twenty_k.csv', { headers: true })
        .on("data", data => {
            dataArr.push(data);
        })
        
        .on("end", () => {
            console.log(dataArr.length);
            var query = {};

            const queries = [];
            var finalQ = {};
            var FinalQueries = [];

            return Promise.each(dataArr, singleObj => {
                var data = singleObj;
                
                var q1 = 'INSERT INTO company.employee(emp_id, department, first_name, last_name, phone, projects, skills) values (?,?,?,?,?,?,?)';
                var p1 = [data.emp_id , data.department , data.first_name , data.last_name , null , null, null];
                
                queries.push({query : q1, params:  p1});

            }).then(data => {

                var i,j,temparray,chunk = 100;
                for (i=0,j=queries.length; i<j; i+=chunk) {
                    temparray = queries.slice(i,i+chunk);
                    console.log("temparray:",temparray.length);

                    client.batch(temparray, { prepare: true })
                        .then(result => {
                            console.log("result:", result);
                        })
                        .catch(err => {
                            console.log("err:", err);
                        });
                }
                
            }).catch(err => {
                console.log("err:", err);
            });
        });

});

router.get('/importcsv', (req, res) => {
    console.log("Import csv file API calling !!!");
    
    var dataArr = [];
   
    csv.fromPath(__dirname + '/../data/twenty_k.csv', { headers: true })
        .on("data", data => {
            dataArr.push(data);
        })
        
        .on("end", () => {
            console.log(dataArr.length);
            var query = {};

            const queries = [];
            var finalQ = {};
            var FinalQueries = [];

            return Promise.each(dataArr, singleObj => {
                var data = singleObj;
                
                var q1 = 'INSERT INTO company.employee(emp_id, department, first_name, last_name, phone, projects, skills) values (?,?,?,?,?,?,?)';
                var p1 = [data.emp_id , data.department , data.first_name , data.last_name , null , null, null];
                
                queries.push({query : q1, params:  p1});

            }).then(data => {

                var i,j,temparray,chunk = 100;
                for (i=0,j=queries.length; i<j; i+=chunk) {
                    temparray = queries.slice(i,i+chunk);
                    console.log("temparray:",temparray.length);

                    client.batch(temparray, { prepare: true })
                        .then(result => {
                            console.log("result:", result);
                        })
                        .catch(err => {
                            console.log("err:", err);
                        });
                }
                
            }).catch(err => {
                console.log("err:", err);
            });
        });

});

module.exports = router;