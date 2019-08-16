import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import moment from 'moment'

import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

import { createBooking, fetchProfileBusyTime } from '../actions';



class BookingsNew extends Component {

    constructor(props) {
      super(props);
      this.state = {
        startDate: new Date(),
        modal: false
      };
      // this.handleChange = this.handleChange.bind(this);
    }



    handleChange = async (date) => {

      await this.setState({
        startDate: date
      });

      const { id } = this.props.match.params;
      const selected_date = this.state.startDate;

      this.props.fetchProfileBusyTime(id, moment(selected_date) );

    }



  onSubmit = (values) => {

    const { id } = this.props.match.params;
    const start_time = this.state.startDate;
    values = {...values, start_time: start_time};

     this.props.createBooking( id, values);





  }

  componentDidMount() {
     const { id } = this.props.match.params;
     const selected_date = this.state.startDate;


       this.props.fetchProfileBusyTime(id, moment(selected_date) );
  }



  componentWillReceiveProps  = (nextProps, nextState) => {
    //  console.log("api =>>>>>>>>>>>" , nextProps.formError.errors );
    // console.log("api =>>>>>>>>>>>" , nextProps.formError.id );
    // const dismissModal = document.getElementById('book-submit-form');
      // dismissModal.setAttribute('data-dismiss', '');
    if(nextProps.formError.errors && nextProps.formError.errors.length){
      // dismissModal.setAttribute('data-dismiss', '');
    }else if(Number.isInteger(nextProps.formError.id) && nextProps.formError.id > 0){
    this.setState({modal: true});
    this.props.reset();
    // dismissModal.setAttribute('data-dismiss', 'modal');
    }
  }



  renderError = ({error, touched}) => {
    if(touched && error){
      return <div>{error}</div>
    }
  }



  renderField = (field) => {

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          value={field.input.value}
          type={field.type}
              {...field.input}
        />
        {this.renderError(field.meta)}
      </div>
    );
  }

  renderSuccess =  () => {
    this.setState({modal: false});


  }



  renderBtnSubmit = () => {
    if(this.state.modal){
      return (
         <button  className="btn btn-success" data-dismiss="modal"
          onClick={this.renderSuccess}
           >
              Great Success
          </button>
      );


    }else{
      return(
         <button id="book-submit-form" className="btn btn-primary" type="submit"
          disabled={  this.props.pristine || this.props.submitting} >
              Create Booking
          </button>
      );
    }
  }



  renderBusy =   ()   =>  {

    if( this.props.busy && this.props.busy.length){
        // https://github.com/Hacker0x01/react-datepicker/blob/master/docs-site/src/examples/inject_times.jsx
      let res = [];
      res =  this.props.busy.map( b => {

        let today = new Date(b.start_time);
        let select_day = new Date(this.state.startDate).getDate();

        if( select_day === today.getDate()) {

          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

        return  setHours(setMinutes(date, min), hours);
        }
      });


      let cond = [];
      cond =  this.props.busy.map( b => {

        let today = new Date(b.start_time);
        let select_day = new Date(this.state.startDate).getDate();

        if( select_day === today.getDate()) {

          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();
          const duration_time = hour_concat + min_concat;
          const duration_time_interger = parseInt(duration_time);


          if( duration_time_interger === 10){
            return setMinutes(date, min + 30 );
          }

          if( duration_time_interger === 130){
            return setMinutes(date, min + 30 );
          }

          if( duration_time_interger === 20){
            return setMinutes(date, min + 30 );
          }
        }
      });

      let cond_2 = [];
      cond_2 =  this.props.busy.map( b => {

      let today = new Date(b.start_time);
      let select_day = new Date(this.state.startDate).getDate();

        if( select_day === today.getDate()) {

          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();

          const duration_time = hour_concat + min_concat;
          const duration_time_interger = parseInt(duration_time);


          if( duration_time_interger === 130){
            return setMinutes(date, min + 60 );
          }

          if( duration_time_interger === 20){
            return setMinutes(date, min + 60 );
          }
        }
      });

      let cond_3 = [];
      cond_3 =  this.props.busy.map( b => {

        let today = new Date(b.start_time);
        let select_day = new Date(this.state.startDate).getDate();

        if( select_day === today.getDate()) {

          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();
          const duration_time = hour_concat + min_concat;
          const duration_time_interger = parseInt(duration_time);

          if( duration_time_interger === 20){
            return setMinutes(date, min + 90 );
          }
        }
      });

      let res_2 = [];
      res_2 =  this.props.busy.map( b => {

        let today = new Date(b.end_time);
        let select_day = new Date(this.state.startDate).getDate();

        if( select_day === today.getDate()) {

          let date = today
          let hours = today.getHours();
          let min = today.getMinutes();

        return  setHours(setMinutes(date, min), hours);
        }
      });

      return [ ...res, ...res_2, ...cond, ...cond_2, ...cond_3 ];
    }
  }



//  minTime={moment(new Date())}
// maxTime={moment(new Date()).add( 1 , 'h')}

  render() {


    return (
      <div>
      {/*onChange={this.onFormChange}*/}
        <form    onSubmit={this.props.handleSubmit(this.onSubmit)}>
           {/* <Field
              label="date"
              name="start_time"
              type="datetime-local"
              component={this.renderField}
            />*/}
            <DatePicker
                label="date"
                name="start_time"
                inline
                selected={this.state.startDate}
                onChange={  (date) => { this.handleChange(date) } }
                showTimeSelect
                dateFormat="Pp"

                excludeTimes={this.renderBusy()}


                minDate={new Date()}
                component={this.DatePicker}

              />
             {this.props.formError.errors}

            {/*<Field
              label="date end"
              name="end_time"
              type="datetime-local"
              component={this.renderField}
            />*/}


            <Field
              label="time"
              name="duration"
              type="time"
              component={this.renderField}
            />
          {/*data-dismiss={this.state.modal}*/}
          {this.renderBtnSubmit()}

        </form>
        <div>
        </div>
      </div>
    );
 }
}

const validate = (values) => {
  const errors = {};
  if(!values.start_time) {
    errors.start_time = "this field is require";
  }
  if(!values.duration) {
    errors.duration = "this field is require";
  }
  return errors;
};

const mapStateToProps = (state) => {

    return {  formError: state.formError,
              busy: state.busy
     }

}

export default reduxForm({ form: 'newBookingForm', validate  })(
  connect(mapStateToProps, { createBooking, fetchProfileBusyTime})(BookingsNew)
);
