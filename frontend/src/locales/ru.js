export default {
  translation: {
    languages: {
      ru: 'Русский',
      en: 'English',
    },

    register: 'Регистрация',
    logout: 'Выйти',
    channels: 'Каналы',
    createChannel: 'Создать канал',
    message: 'Сообшение',
    writeMessage: 'Напишите сообщение...',
    send: 'Отправить',
    rename: 'Переименовать',
    del: 'Удалить',

    login: {
      welcome: 'Добро пожаловать в Slack Chat!',
      singIn: 'Войти',
      username: 'Имя пользователя',
      password: 'Пароль',
      invalidLogin: 'Неверные имя пользователя или пароль',
      submit: 'Подтвердить',
    },

    singup: {
      welcome: 'Добавить нового пользователя в Slack Chat',
      singup: 'Зарегистрироваться',
      passConfirm: 'Подтвердите пароль',
    },

    error: {
      validation: {
        required: 'Поле не должно быть пустым',
        notOneOf: 'Канал с таким именем уже существует',
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        passwordMismatch: 'Пароли должны совпадать',
      },
      load: {
        network: 'Ошибка сети',
        err: 'Ошибка',
        axios: 'Ошибка загрузки',
        alreadyExists: 'Уже существует',
        server: 'Ошибка сервера',
      },
      404: {
        pageNotFound: 'Страница не найдена',
        noPage: 'Страница, которую вы ищете, не существует или была перемещена.',
        goMainpage: 'На главную',
        err: 'Упс! Кажется, вы заблудились.',
        back: 'Назад',
      },
    },

    modal: {
      cancel: 'Отмена',
      save: 'Сохранить',
      delete: 'Удалить',
      rename: 'Переименовать',
      channel: 'канал',
      message: 'сообщение',
      body: {
        addMessage: 'Введите новое сообщение',
        successDel: 'Успешно удалено',
        successEdit: 'Успешно отредактировано',
        errorDel: 'Удаление немозможно',
      },
      addChannel: {
        title: 'Создать канал',
        body: 'Введите название нового канала',
      },
    },

    // default: 'oops!',
  },
}
