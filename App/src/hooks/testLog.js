//a console.log statement wrapped in a fucn for quick loggin

export const log = (message, page, mainLog = '') =>
  console.log(`${message} ${mainLog} in ${page.toString().toUpperCase()} page`);
