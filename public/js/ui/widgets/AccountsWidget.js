/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Передан пустой элемент в AccountsWidget");
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('.create-account').addEventListener('click', () => {
      App.getModal('createAccount').open();
    });

    //При нажатии на один из существующих счетов(которые отображены в боковой колонке), вызывает AccountsWidget.onSelectAccount()-


    const accountBtn = 

    this.element.addEventListener('click', e => {
      const target = e.target.closest('.account');
      if (target) {
        this.onSelectAccount(target);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    console.log('---Вызван AccountsWidget.update()')
    const user = User.current();

    if (user) {
      const callback = (error, response) => {
        if (error) {
          console.log(error);
        } else {
          this.clear();
          for (const item of response.data) {
            this.renderItem(item);
          }
        }
      };

      Account.list(user, callback);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    for (let item of Array.from(document.querySelectorAll('.account'))) {
      item.remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const activeAccount = this.element.querySelector('.active');
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }
    element.classList.add('active');
    // App.showPage( 'transactions', { account_id: id_счёта });
    const accountName = element.querySelector('span').textContent;

    const callback = (error, response) => {
      if (error) {
        console.log(error);
      } else {
        const accountId = response.data.find(account => {
          return account.name === accountName;
        }).id;
        console.log(accountId);
        App.showPage('transactions', {account_id: accountId});
      }
    };

    Account.list(User.current(), callback);
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `<li class="account" data-id="${item.id}">
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
    </a>
</li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}