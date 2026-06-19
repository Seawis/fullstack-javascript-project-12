export default {
  translation: {
    languages: {
      ru: 'Русский',
      en: 'English',
    },

    register: 'Sing Up',
    logout: 'Log out',
    channels: 'Channels',
    createChannel: 'Create channel',
    message: 'Message',
    writeMessage: 'Write a message...',
    send: 'Send',
    rename: 'Rename',
    del: 'Delete',

    login: {
      welcome: 'Welcome to the Slack Chat!',
      singIn: 'Sign in',
      username: 'Username',
      password: 'Password',
      invalidLogin: 'The username or password is incorrect',
      submit: 'Submit',
    },

    singup: {
      welcome: 'Add new user to the Slack Chat',
      singup: 'Sing up',
      passConfirm: 'Confirm password',
    },

    error: {
      validation: {
        required: 'The field must not be empty',
        notOneOf: 'Channel with same name already created',
        username: 'From 3 to 20 characters',
        password: 'At least 6 characters',
        passwordMismatch: 'Passwords must match',
      },
      load: {
        network: 'Network error',
        err: 'Error',
        axios: 'Download error',
        alreadyExists: 'Already exists',
        server: 'Server error',
      },
      404: {
        pageNotFound: 'Page not found',
        noPage: 'The page you are looking for does not exist or has been moved.',
        goMainpage: 'Go to the main page',
        err: 'Oops, you seem to be lost.',
        back: 'Back',
      },
    },

    modal: {
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      rename: 'Rename',
      channel: 'channel',
      message: 'message',
      body: {
        addMessage: 'Enter a new message',
        successDel: 'Successfully deleted',
        successEdit: 'Edited successfully',
        errorDel: 'It is not possible to delete',
      },
      addChannel: {
        title: 'Create channel',
        body: 'Enter the name of the new channel',
      },
    },
  },
}
