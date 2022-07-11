/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    function callback (error, response) {
      if (error) {
        console.error(error);
        document.querySelector('.error-text_register').innerText = error;
      }else {
        User.setCurrent(response.user);
        App.setState('user-logged');
        App.getModal('register').close();
      }
    }
    User.register(data, callback);
    this.element.reset();
  }
}