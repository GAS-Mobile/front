export const validateCpf = (inputCpf) => {
  const cpfRegex = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
  return cpfRegex.test(inputCpf);
};  

export const validateEmail = (email) => {
  const emailRegex = /^\w[A-Za-z0-9.]+@[A-Za-z0-9.]+\.[A-Za-z0-9.]+$/;
  return emailRegex.test(email)
};

export const validateCnpj = (inputCnpj) => {
  const cnpjRegex = /\d{2}\.\d{3}\.\d{3}\/(0001|0002)-\d{2}/;
  return cnpjRegex.test(inputCnpj);
};  