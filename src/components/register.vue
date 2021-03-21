<template>
    <div class="container-register">
      <div v-if="completed === 'first'" class="register-step">
        <h3>step 2/4</h3>
        <div class="form-group">
          <label for="email">Ваш email</label>
          <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
              id="email"
          />
          <div
              v-if="submitted && errors.has('email')"
              class="alert-danger">
            {{errors.first('email')}}
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Ваш номер телефона</label>
          <input
              v-model="user.phone"
              v-validate="'required|min:10|max:20'"
              type="text"
              class="form-control"
              name="phone"
              id="phone"
          />
          <div
              v-if="submitted && errors.has('phone')"
              class="alert-danger"
          >{{errors.first('phone')}}</div>
        </div>
        <div class="form-group">
          <label for="brithDay">Ваша дата рождения</label>
          <input
              v-model="user.brithDay"
              v-validate="'required|min:1|max:20'"
              type="data"
              class="form-control"
              name="brithDay"
              id="brithDay"
          />
          <div
              v-if="this.submitted && errors.has('brithDay')"
              class="alert-danger"
          >{{errors.first('brithDay')}}</div>
        </div>
        <div class="form-group">
          <button v-on:click="()=>{completed = 'second'}" class="btn btn-primary btn-block">Далее</button>
          <button v-on:click="completed = ''" class="">назад</button>
        </div>
      </div>
      <div v-else-if="completed === 'second'" class="register-step">
        <h3>step 3/4</h3>
        <div class="form-group">
          <label for="street">Ваша улица</label>
          <input
              v-model="user.street"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="street"
              id="street"
          />
          <div
              v-if="submitted && errors.has('street')"
              class="alert-danger">
            {{errors.first('street')}}
          </div>
        </div>
        <div class="form-group">
          <label for="house">Ваш дом</label>
          <input
              v-model="user.house"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="house"
              id="house"
          />
          <div
              v-if="submitted && errors.has('house')"
              class="alert-danger"
          >{{errors.first('house')}}</div>
        </div>
        <div class="form-group">
          <label for="flat">Ваш номер квартиры</label>
          <input
              v-model="user.flat"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="flat"
              id="flat"
          />
          <div
              v-if="submitted && errors.has('flat')"
              class="alert-danger"
          >{{errors.first('flat')}}</div>
        </div>
        <div class="form-group">
          <button v-on:click="()=>{completed = 'third'}" class="btn btn-primary btn-block">Далее</button>
          <button v-on:click="completed = 'first'" class="">назад</button>
        </div>
      </div>
      <div v-else-if="completed === 'third'" class="register-step">
        <h3>step 4/4</h3>
        <div class="form-group">
          <label for="username">Ваш login</label>
          <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
              id="username"
          />
          <div
              v-if="submitted && errors.has('username')"
              class="alert-danger">
            {{errors.first('username')}}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Ваш пароль</label>
          <input
              v-model="user.password"
              v-validate="'required|min:6|max:50'"
              type="password"
              class="form-control"
              name="password"
              id="password"
          />
          <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
          >{{errors.first('password')}}</div>
        </div>
        <div class="form-group">
          <label for="repeatPassword">Повторите ваш пароль</label>
          <input
              v-model="user.repeatPassword"
              v-validate="'required|min:6|max:50'"
              type="password"
              class="form-control"
              name="repeatPassword"
              id="repeatPassword"
          />
          <div
              v-if="submitted && errors.has('repeatPassword')"
              class="alert-danger"
          >{{errors.first('repeatPassword')}}</div>
        </div>
        <div class="form-group">
          <button v-on:click="handleRegister()" class="btn btn-primary btn-block">завершить</button>
          <button v-on:click="completed = 'second'" class="">назад</button>
        </div>
      </div>
      <div v-else class="register-step">
        <h3>step 1/4</h3>
        <div class="form-group">
          <label for="secondName">Ваша фамилия</label>
          <input
              v-model="user.secondName"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="secondName"
              id="secondName"
          />
          <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
          >{{errors.first('email')}}</div>
        </div>
        <div class="form-group">
          <label for="firstname">Ваше имя</label>
          <input
              v-model="user.firstName"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="firstname"
              id="firstname"
          />
          <div
              v-if="submitted && errors.has('username')"
              class="alert-danger">
            {{errors.first('username')}}
          </div>
        </div>
        <div class="form-group">
          <label for="lastName">Ваше отчество</label>
          <input
              v-model="user.lastName"
              v-validate="'required|min:1|max:50'"
              type="text"
              class="form-control"
              name="lastName"
              id="lastName"
          />
          <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
          >{{errors.first('password')}}</div>
        </div>
        <div class="form-group">
          <button v-on:click="()=>{this.completed = 'first'}" class="btn btn-primary btn-block">Далее</button>
        </div>
      </div>
    </div>
</template>

<script>
import User from '../models/user';

export default {
  name: "register",
  data() {
    return {
      user: new User('', '', '', '', '', '', '','','','', '', ''),
      completed: '',
      submitted: false,
      successful: false,
      message: ''
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$store.dispatch('auth/register', this.user).then(
          data => {
            this.message = data.message;
            this.successful = true;
            localStorage.setItem('user', JSON.stringify(data))
            location.reload()
          },
          error => {
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
          }
      );
    }
  }
}
</script>

<style scoped>

</style>