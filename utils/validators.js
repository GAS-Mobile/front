export const validateCpf = (inputCpf) => {
  const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
  return cpfRegex.test(inputCpf);
};  

export const validateEmail = (email) => {
  const emailRegex = /^\w[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9.]+$/;
  return emailRegex.test(email)
};