/**
 * returns the first letter of the word in capital letter.
 * if you pass hello it will return H
 */
export const getFirstLetterCaps = (word) => {
    if (word && typeof word === 'string') {
        return word.charAt(0).toUpperCase();
    }
    return '';
}


export const getFormattedDate = () => {
    const date = new Date();

    return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0');

}

export const UserRoles = {
    ADMIN: 'Administrator',
    USER: 'User',
    GUEST: 'Guest'
  };

  export const UserStatus = {
    Active:'Active',
    Inactive:'Inactive'
  };

  export const ApplicationMessages={
    InactiveUserLoginMessage:'You will be authenticated to login into app once your UserId is activated by Admin. Till then stay tuned! Reach out to Admin at neeraj.mourya@nusummit.com for approval.',
    UserDataUpdateTitle:'User Data Update',
    UserDataUpdateDescription:'Are you sure you want to {0} user {1}?',
    UserStatusUpdateMessage:'User status updated successfully',
    UserResetUpdateMessage:'User data reset successfully!',
    UserDataUpdateMessage:'User data updated successfully',
    ErrorMsg:'Something went wrong. Please try again after sometimes!',
    RoleRequiredErrorMsg: 'Please select role!',
    FileUploadError: 'Something went wrong, Please try again.',
    FileUploadSuccess: 'File uploaded successfully.',
    FileUploadWrongFile: 'Please select valid files to upload!',
    BannerMessage: 'Last 30 days circulars available for use.'
  }

  export const formatString = (str, ...args) => {
    return str.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

export const validateEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}
