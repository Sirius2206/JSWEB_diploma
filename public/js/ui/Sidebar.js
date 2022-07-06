/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebar = document.querySelector('.sidebar-mini');
    const btn = document.querySelector('.sidebar-toggle');

    btn.addEventListener('click', e => {
      sidebar.classList.toggle('sidebar-open');
      sidebar.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const regBtn = document.querySelector('.menu-item_register');
    const loginBtn =document.querySelector('.menu-item_login');
    const logoutBtn = document.querySelector('.menu-item_logout');
    regBtn.addEventListener('click', e => {
      App.getModal('register').open();
    });
    loginBtn.addEventListener('click', e => {
      App.getModal('login').open();
    });
    logoutBtn.addEventListener('click', e => {
      User.logout()
    });

  }
}