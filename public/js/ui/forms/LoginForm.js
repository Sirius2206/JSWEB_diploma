/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    function callback (error) {
      if (error) {
        console.error(error);
        document.querySelector('.error-text_login').innerText = error;
      }else {
        App.setState('user-logged');
        App.getModal('login').close();
      }
    }
    User.login(data, callback);
    this.element.reset();
  }
}