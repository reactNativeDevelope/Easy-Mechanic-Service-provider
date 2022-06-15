const apiConfig = {

    /******* Auth *******/
    register: 'mechanic/register',
    checkNumber: 'mechanic/login',
    login: 'mechanic/login',
    forgotPassword:'mechanic/forgotPassword',
    updateProfilePic:'mechanic/updateProfileImage',
    editProfile:'mechanic/editprofile',
    changePassword:'mechanic/changePassword',
    deleteAccount:'mechanic/deleteAccount',
    categories:'mechanic/getActiveCategories',
    getProfile:'mechanic/getMechanicProfile',
    suppliers:'mechanic/getUsersByCategory/',
    spareParts:'mechanic/getSupplierSpareparts/',
    resetPassword:'mechanic/resetPassword',
    verifyOtp:'mechanic/verifyUserOTP',
    resendOtp:'mechanic/sendOtp',
    onlineOffline:'mechanic/updateOnlineOffline',
    termsCondition:'mechanic/getTermsAndCondition',
    updateCategories:'mechanic/updateCategory'

}

export const apiSuccess = 'success'
export const apiFailure = 'failure'

export default apiConfig