import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import moment from 'moment';

import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';


import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

import {deleteBooking, createBooking, fetchProfileBusyTime, fetchProfileBusyNow, fetchProfile } from '../actions';

// import ScrollTimer from "../components/ScrollTimer";

class BookingsNew extends Component {

    constructor(props) {
      super(props);
      this.state = {
        startDate: new Date(),
        modal: false,
        loading: null,
        booked: false,
        value: "30",

        timetouched: null,

        durationFront: 0,
        durationValue: "00:30",
        completed: false,
        email: ''

      };
      // this.topOfPageRef = React.createRef();

      // this.onSubmit = this.onSubmit.bind(this);
       // this.handleChange = this.handleChange.bind(this);
    }

    handleTimeChange = (event) => {
      this.setState({value: event.target.value});
    }


    changeLoadind = async () => {
      await this.setState({
        loading: null
        });
      await this.setState({
        booked: false
        });
      console.log("changeLoadind", this.state.loading);
    }



    handleChange = async (date) => {

      await this.setState({
        startDate: date
      });

      await this.setState({
         timetouched: true
      });



      const { id } = this.props.match.params;
      const selected_date = this.state.startDate;

      const time_right_now = new Date();
      // var MyDateString;








      this.props.fetchProfileBusyTime(id, moment(selected_date) );

      if(selected_date.getDate() === time_right_now.getDate() ){
        this.props.fetchProfileBusyNow(id, moment(time_right_now));

        const elmnt = document.getElementsByClassName("react-datepicker__time-list-item react-datepicker__time-list-item--disabled");
        const start_el = document.getElementsByClassName("react-datepicker__time-list");
        const last_elmnt = elmnt[elmnt.length - 1];
        last_elmnt.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

      }

    }



  onSubmit = async ( values) => {



    const { id } = this.props.match.params;
    const start_time = this.state.startDate;




    // preventDefault();

      const duration = this.state.durationValue;

    values = { ...values, start_time: start_time, duration: duration};

      let responseBooking = {};
      if(this.state.timetouched){
        responseBooking = await this.props.createBooking( id, values);
      }



    if(responseBooking.payload.id ){
      await this.setState({modal: false});
      await this.setState({booked: true});

    }else if(responseBooking.payload.errors && responseBooking.payload.errors.length > 0){
       await this.setState({modal: true});
      await this.setState({booked: false});

    }


    const selected_date = this.state.startDate;

   await this.props.fetchProfileBusyTime(id, moment(selected_date) );

   const time_right_now = new Date();

      if(selected_date.getDate() === time_right_now.getDate() ){
        this.props.fetchProfileBusyNow(id, moment(time_right_now));
      }
  }



  componentDidMount = async () =>  {
    const { id } = this.props.match.params;
    const selected_date = this.state.startDate;

    this.props.fetchProfileBusyTime(id, moment(selected_date) );


    await this.props.fetchProfile(this.props.match.params.id);

    const time_right_now = new Date();

       if(selected_date.getDate() === time_right_now.getDate() ){

       await this.props.fetchProfileBusyNow(id, moment(time_right_now));

       }



    await this.setState({ timetouched: false});
    const email_data = document.getElementById('root');
    const email = email_data.dataset.user;
    this.setState({email: email})
      debugger

  }



  componentWillReceiveProps  = (nextProps, nextState) => {

    //  console.log("api =>>>>>>>>>>>" , nextProps.formError.errors );
    // console.log("api =>>>>>>>>>>>" , nextProps.formError.id );
    // const dismissModal = document.getElementById('book-submit-form');
      // dismissModal.setAttribute('data-dismiss', '');
    if(nextProps.formError.errors && nextProps.formError.errors.length){
      // dismissModal.setAttribute('data-dismiss', '');
      debugger
      this.setState({loading: null});

    }else if(Number.isInteger(nextProps.formError.id) && nextProps.formError.id > 0   ){
    this.renderBusy();


    // this.props.reset();
    // dismissModal.setAttribute('data-dismiss', 'modal');
    }
  }

  // async componentDidUpdate(prevProps, prevState) {

  //   if(this.props.now.length && this.props.now){

  //   const elmnt = document.getElementsByClassName("react-datepicker__time-list-item react-datepicker__time-list-item--disabled");
  //   const start_el = document.getElementsByClassName("react-datepicker__time-list");
  //   const last_elmnt = elmnt[elmnt.length - 1];
  //   await this.topOfPageRef.current.scrollIntoView();
  //   // await last_elmnt.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  //    debugger
  //   }
  // }



  renderError = (meta) => {
    if(this.props.touched && error){
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



  renderCreateBooking =  async () => {

    // state to verif if not touched

    this.setState({modal: true});
    const { id } = this.props.match.params;
    const selected_date = this.state.startDate;

     console.log("try to disbled btn", this.props.anyTouched )
      console.log("try to disbled btn", this.newBookingForm)
      console.log("try to disbled btn", moment(selected_date))
      console.log("try to disbled btn", moment(selected_date))
      console.log("try to disbled btn", moment(selected_date))
      console.log("try to disbled btn", moment(selected_date))

    await this.props.fetchProfileBusyTime(id, moment(selected_date) );

    await this.setState({ loading: true});
  }





  renderBtnSubmit =  () => {

    console.log("renderBtnSubmit  1 ==================")
    // this.setState({ timetouched: false});

    if(this.state.loading === null){
      return(
         <button
          id="book-submit-form"
          className="btn btn-primary btn-booking-position"
          type="submit"
          onClick={this.renderCreateBooking}
          disabled={ !this.state.timetouched}
          >
              Step 1 / 2
          </button>

          );
    }



    if(this.state.loading === false){
      return <div>loading ....</div>
    }


    return (
      <h1>Animation</h1>
      );


      // return(


      //    <button id="book-submit-form" className="btn btn-primary" type="submit"
      //      onClick={this.renderCreateBooking}>
      //         Create Booking
      //     </button>
      // );

  }

  // disabled={  this.props.pristine || this.props.submitting}



  renderBusy = () =>  {
    const verif_selected_date =  this.state.startDate;
      const verif_right_now =  new Date();

      let res = [];
      let cond = [];
      let cond_2 = [];
      let cond_3 = [];
      let res_2 = [];
      let busy_till_now = [];

      // if my end_time > today
      // return array + 30 min

     let over_lap_busy = [];
     let over_lap_busy_2 = [];
     let over_lap_busy_3 = [];

   over_lap_busy = this.props.busy.map( b =>{

    let today = new Date(b.start_time);
    let select_day = new Date(this.state.startDate).getDate();


      if (select_day > today.getDate() ){

          let today = new Date(b.end_time);
          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();
          const duration_time = hour_concat + min_concat;
          //const duration_time_interger = parseInt(duration_time);




          if( duration_time === "10"){
            return setMinutes(date, min - 30 );
          }

          if( duration_time === "130"){
            return setMinutes(date, min - 30 );
          }

          if( duration_time === "20"){

            return setMinutes(date, min - 30 );
          }

      }
    })


    over_lap_busy_2 = this.props.busy.map( b =>{

    let today = new Date(b.start_time);
    let select_day = new Date(this.state.startDate).getDate();


      if (select_day > today.getDate() ){

          let today = new Date(b.end_time);
          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();
          const duration_time = hour_concat + min_concat;
          //const duration_time_interger = parseInt(duration_time);





          if( duration_time === "130"){
            return setMinutes(date, min - 60 );
          }

          if( duration_time === "20"){

            return setMinutes(date, min - 60 );
          }

      }
    })

    over_lap_busy_3 = this.props.busy.map( b =>{

    let today = new Date(b.start_time);
    let select_day = new Date(this.state.startDate).getDate();


      if (select_day > today.getDate() ){

          let today = new Date(b.end_time);
          let date = today;
          let hours = today.getHours();
          let min = today.getMinutes();

          let duration_hour = new Date(b.duration).getHours();
          let duration_minute = new Date(b.duration).getMinutes();

          const hour_concat = duration_hour.toString();
          const min_concat = duration_minute.toString();
          const duration_time = hour_concat + min_concat;
          //const duration_time_interger = parseInt(duration_time);





          if( duration_time === "20"){
            return setMinutes(date, min - 90 );
          }

      }
    })


    if(verif_selected_date.getDate() === verif_right_now.getDate()){

      busy_till_now =  this.props.now.map( b => {
       //debugger
       let today = new Date(b);

        let select_day = new Date(b).getDate();

        if( select_day === today.getDate()) {

          let date = today;
          let hours = today.getHours();

          let min = today.getMinutes();

        return   setHours(setMinutes(date, min), hours);
        }
      });
    }

    if( this.props.busy && this.props.busy.length  ){







        // https://github.com/Hacker0x01/react-datepicker/blob/master/docs-site/src/examples/inject_times.jsx

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
          //const duration_time_interger = parseInt(duration_time);




          if( duration_time === "10"){
            return setMinutes(date, min + 30 );
          }

          if( duration_time === "130"){
            return setMinutes(date, min + 30 );
          }

          if( duration_time === "20"){
            return setMinutes(date, min + 30 );
          }
        }


      });


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
          //const duration_time_interger = parseInt(duration_time);


          if( duration_time === "130"){
            return setMinutes(date, min + 60 );
          }


          if( duration_time === "20"){
            return setMinutes(date, min + 60 );
          }
        }
      });


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
          //const duration_time_interger = parseInt(duration_time);



          if( duration_time === "20"){
            return setMinutes(date, min + 90 );
          }
        }

      });


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
      // res
      // busy_till_now
        // debugger

    }
     return [ ...busy_till_now, ...res, ...res_2,  ...cond, ...cond_2, ...cond_3, ...over_lap_busy, ...over_lap_busy_2, ...over_lap_busy_3 ];
  }

  formatDuration = (values) => {

    if(this.state.durationFront === 0){
        this.setState({ durationValue: "00:30" });
      }
      if( this.state.durationFront === 1){
         this.setState({ durationValue: "1" });
      }
      if( this.state.durationFront === 2){
         this.setState({ durationValue: "01:30" });
      }
      if( this.state.durationFront === 3){
         this.setState({ durationValue: "02:00" });
      }

  }

  IncrementItem = async (e) => {
    this.state.durationFront

    if(this.state.durationFront <= 2 && this.state.durationFront >= 0){
        await this.setState({ durationFront: this.state.durationFront + 1 });
        await this.formatDuration();
    }else{
      this.state.durationFront
    }
  }

  DecreaseItem = async (e) => {

    if(this.state.durationFront > 0  ){
       await this.setState({ durationFront: this.state.durationFront - 1 });
      await this.formatDuration();
    }else{
      this.state.durationFront
    }



  }



  renderPhoto = () =>{
    if(this.props.profile.photo){
      return(
        <div className="space-image-form-booking">
            <div >
              <img  src={this.props.profile.photo.url} alt="Card image cap" className="image-booking-form" />
            </div>
        </div>
        )
    }else{
      return <h1>loading...</h1>
    }
  }

  triggerTimer = () => {
    const elmnt = document.getElementsByClassName("react-datepicker__time-list-item react-datepicker__time-list-item--disabled");
    const start_el = document.getElementsByClassName("react-datepicker__time-list");
    const last_elmnt = elmnt[elmnt.length - 1];
    last_elmnt.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  backToBook = async () => {
     // if( this.props.complete ) {
     //    console.log("complete")
     // }else{
    await this.setState({ booked: false});
    await this.setState({ loading: null});
    // await this.setState({ timetouched: false});
    const profile_id = this.props.match.params.id
    const booking_id = this.props.formError.id
    this.props.deleteBooking(profile_id, booking_id);
     // }


  }

  renderBackBooking = () => {
    debugger
    if(this.state.completed){
      return <div></div>
    }else{
      return (
         <div className="btn btn-danger btn-booking-back"
              onClick={this.backToBook}
            >  Back
          </div>

        )
    }
  }

  updateCompleted = (results) => {
   this.setState({completed:results});
  }




//  minTime={moment(new Date())}
// maxTime={moment(new Date()).add( 1 , 'h')}

  render() {

    if (this.state.booked) {

      return(
              <div className="grid-booking">
                <div>
                  {this.renderPhoto()}
                </div>
                <span className="rectengle9-background"></span>
                <span className="rectengle10-background"></span>
                <Elements>
                    <InjectedCheckoutForm
                        profile_id={this.props.match.params.id}
                        booking_id={this.props.formError.id}
                        updateCompleted={this.updateCompleted}
                        completed={this.state.completed}
                        email={this.props.email}
                    />
                </Elements>

                <span className="rectengle11-background"></span>
                <span className="rectengle12-background"></span>
                {this.renderBackBooking()}
               {/* <div className="btn btn-danger btn-booking-back" onClick={this.backToBook}>  Back </div>*/}
              </div>
      )
    }






    return (




      <div className="grid-booking">
      {this.renderPhoto()}

      {/*onChange={this.onFormChange}*/}
        <form    onSubmit={this.props.handleSubmit(this.onSubmit)} >
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
                ref={this.topOfPageRef}


            />
            <div className="btn btn-primary available-time" onClick={this.triggerTimer}>=> </div>



             <div>{this.props.formError.errors}</div>
        <div className= "group-duration">
           <h1 className="text-center">{this.state.durationValue} {this.state.durationFront === 0 ? 'Minutes' : 'Hours'}</h1>
        <div className="btn-container">
          <div id="decrease" className="btn btn-duration" onClick={this.DecreaseItem}><i className="fa fa-minus" ></i></div>
          <div id="increment" className="btn btn-duration" onClick={this.IncrementItem} ><i className="fas fa-plus"></i></div>
        </div>
        </div>

           {/* <h1>{this.state.durationFront} </h1>*/}
            {/*<Field
              label="date end"
              name="end_time"
              type="datetime-local"
              component={this.renderField}
            />*/}

            {/*<Field
            label="time"
            name="duration"

            type="range"
            min="30" max="120"
            value={this.state.value}
            onChange={this.handleTimeChange}
            step="30"
            component={this.renderField}
            />
          {this.state.value}*/}



            {/*<Field
              label="time"
              name="duration"
              type="text"
              pattern="[0-9]*"
              component={this.renderField}
            />*/}
          {/*data-dismiss={this.state.modal}*/}
        {/*   () => renderbtn */}
          {this.renderBtnSubmit()}

        </form>





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
              busy: state.busy,
              now: state.now,
              profile: state.profile
     }

}

export default reduxForm({ form: 'newBookingForm', validate  })(
  connect(mapStateToProps, { deleteBooking, createBooking, fetchProfileBusyTime, fetchProfileBusyNow, fetchProfile})(BookingsNew)
);
