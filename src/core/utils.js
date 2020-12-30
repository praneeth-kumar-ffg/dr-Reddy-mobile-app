export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return ' Required';
  if (!re.test(email)) return 'Invalid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return ' Required';
};

export const companyValidator = name => {
  if (!name || name.length <= 0) return ' Required';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return ' Required';

  return '';
};

export const studentIDValidator = studentID => {
  if (!studentID || studentID.length <= 0) return ' Required';

  return '';
};

export const phoneValidator = phone => {
  const re_phone = /^\d{10}$/;
  if (!phone || phone.length <= 0) return ' Required';
  if (!re_phone.test(phone)) return 'Invalid Phone Number';

  return '';
};

export const mobileValidator = mobile => {
  if (!mobile || mobile.length <= 0) return ' Required';

  return '';
};

export const stateValidator = state => {
  if (!state || state.length <= 0) return ' Required';

  return '';
};

export const cityValidator = city => {
  if (!city || city.length <= 0) return ' Required';

  return '';
};

export const dateOfBirthValidator = dateOfBirth => {
  const re2=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  //const re2 = /^\[0-2][0-9]|[3][0-1]-\[0][0-9]|[1][0-2]-\d{4}$/;
//  if (!dateOfBirth || dateOfBirth.length <= 0)
//    return '* Required';
  if (dateOfBirth && !re2.test(dateOfBirth)) return 'Invalid Date of Birth.';

  return '';
};

export const centerNameValidator = centerName => {
  if (!centerName || centerName.length <= 0) return ' Required';

  return '';
};
