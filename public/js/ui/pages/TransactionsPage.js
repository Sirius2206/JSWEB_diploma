/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Передан пустой элемент в TransactionsPage");
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    document.querySelector('.remove-account').addEventListener('click', () => this.removeAccount());
    const rmvTransBtn = (e) => {
      const target = e.target.closest('.transaction__remove');
      if (target) {
       this.removeTransaction(target.dataset.id);
      }
    }

    this.element.addEventListener('click',  rmvTransBtn)
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    const decision = confirm('Вы действительно хотите удалить счёт?');
    if (!this.lastOptions || !decision) return;

    function callback(error) {
      if (error) {
        console.log(error);
      } else {
        App.updateWidgets();
        App.updateForms();
        
      }
    }
    Account.remove({
      id: this.lastOptions.account_id
    }, callback)
    this.clear();
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    const decision = confirm('Вы действительно хотите удалить эту транзакцию?');
    if (!decision) return;

    function callback(error) {
      if (error) {
        console.log(error);
      } else {
        App.update();
      }
    }
    Transaction.remove({
      id: id
    }, callback);
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) return;
    this.lastOptions = options;


    Account.get(options.account_id, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list(options.account_id, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.renderTransactions(response.data);
      }
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счета');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ]
    const regex = /(\d{4})-(\d\d)-(\d\d)[ T](\d\d:\d\d)/;
    const result = date.match(regex);
    if (result[2].startsWith('0')) {
      result[2] = result[2][1];
    }
    return `${result[3]} ${months[result[2] - 1]} ${result[1]} г. в ${result[4]}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    const resultHTML = `<div class="transaction transaction_${item.type} row">
<div class="col-md-7 transaction__details">
  <div class="transaction__icon">
      <span class="fa fa-money fa-2x"></span>
  </div>
  <div class="transaction__info">
      <h4 class="transaction__title">${item.name}</h4>
      <!-- дата -->
      <div class="transaction__date">${this.formatDate(item.created_at)}</div>
  </div>
</div>
<div class="col-md-3">
  <div class="transaction__summ">
  <!--  сумма -->
      ${item.sum}<span class="currency">₽</span>
  </div>
</div>
<div class="col-md-2 transaction__controls">
    <!-- в data-id нужно поместить id -->
    <button class="btn btn-danger transaction__remove" data-id="${item.id}">
        <i class="fa fa-trash"></i>  
    </button>
</div>
</div>`
    return resultHTML;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let resultHTML = '';
    for (let item of data) {
      resultHTML += this.getTransactionHTML(item);
    }
    this.element.querySelector('.content').innerHTML = resultHTML;
  }
}