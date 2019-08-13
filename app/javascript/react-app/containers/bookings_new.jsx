import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';

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
      this.handleChange = this.handleChange.bind(this);
    }



    handleChange(date) {
      this.setState({
        startDate: date
      });
      const { id } = this.props.match.params;
      this.props.fetchProfileBusyTime(id );

    }



  onSubmit = (values) => {

    const { id } = this.props.match.params;
    const start_time = this.state.startDate;
    values = {...values, start_time: start_time};

    this.props.createBooking( id, values);


  }

  componentDidMount() {
     const { id } = this.props.match.params;
      this.props.fetchProfileBusyTime(id );
  }



  componentWillReceiveProps  = (nextProps, nextState) => {
    //  console.log("api =>>>>>>>>>>>" , nextProps.formError.errors );
    // console.log("api =>>>>>>>>>>>" , nextProps.formError.id );
    // const dismissModal = document.getElementById('book-submit-form');
      // dismissModal.setAttribute('data-dismiss', '');


    if(nextProps.formError.errors && nextProps.formError.errors.length){

      // dismissModal.setAttribute('data-dismiss', '');

    }else if(Number.isInteger(nextProps.formError.id) && nextProps.formError.id > 0){

      this.setState({modal: true})

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


  // next(){
  //   if(this.state.modal === "modal"){
  //     const classbtn = "btn btn-success appear";
  //     return classbtn;
  //   }else{
  //     const classbtn = "btn btn-success hide";
  //     return classbtn;
  //   }

  // }

  // submitting(){
  //   if(this.state.modal === ""){
  //     const classbtn = "btn btn-success appear";
  //     return classbtn;
  //   }else{
  //     const classbtn = "btn btn-success hide";
  //     return classbtn;
  //   }
  // }
  //

  renderBtnSubmit = () => {
    if(this.state.modal){
      return (
         <button  className="btn btn-success" data-dismiss="modal"
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
    // debugger
    // if( this.state.startDate === this.props.busy){
    //   debugger;
    // }else {
    //    this.state.startDate === this.props.busy
    //   debugger;
    // }



// https://github.com/Hacker0x01/react-datepicker/blob/master/docs-site/src/examples/inject_times.jsx
     let res = [];
     res =  this.props.busy.map( b => {

       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
       if( select_day === today.getDate()) {

       let date = today

       let hours = today.getHours();
       let min = today.getMinutes();






          return  setHours(setMinutes(date, min), hours);
        }
        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });


    //  let between = [];
    // between =  this.props.busy.map( b => {

    //    let today = new Date(b.start_time);
    //    let select_day = new Date(this.state.startDate).getDate();
    //     if( select_day === today.getDate()) {

    //     let duration_minute = new Date(b.duration).getMinutes();
    //     let duration_hour = new Date(b.duration).getHours();
    //     let date = today

    //    let hours = today.getHours();
    //    let min = today.getMinutes();



    //   // return  setHours(setMinutes(date, min ), hours);


    //   if(duration_minute === 30 ){
    //       return setHours(setMinutes(date, min + duration_minute ), hours  );
    //    }else if (duration_hour === 1){
    //       return setHours(setMinutes(date, min), hours + duration_hour );
    //    }else if (duration_minute === 30 && duration_hour === 1){
    //     // return 2 obj
    //     let set_between_one = setHours(setMinutes(date, min + duration_minute ), hours  );
    //     let set_between_two = setHours(setMinutes(date, min ), hours + duration_hour );
    //     debugger
    //     return {set_between_one , set_between_two}
    //    }





    //   }
    //   });



    // let between_minutes = [];
    // between_minutes =  this.props.busy.map( b => {

    //    let today = new Date(b.start_time);
    //    if(today === undefined){
    //     let today = new Date(b.start_time);
    //     }
    //    let select_day = new Date(this.state.startDate).getDate();
    //     if( select_day === today.getDate()) {

    //     let duration_minute =  new Date(b.duration).getMinutes();
    //     let duration_hour = new Date(b.duration).getHours();


    //    let date = today

    //    let hours = today.getHours();
    //    let min = today.getMinutes();


    //     const abac = {

    //       1: 2,
    //       30: 1,
    //       31: 3,
    //       2: 4,
    //       32: 5
    //     };
    //     const  number_duration = duration_hour + duration_minute;

    //     var i;
    //     for(i = 0; i < abac[number_duration]; i++)  {

    //       return setHours(setMinutes(date, min + 30 ), hours);
    //     }



    //   // if( duration_hour === 1 ){

    //   //     if(duration_minute === 30){


    //   //       return setHours(setMinutes(date, min), hours + 1  ) ;

    //   //     }

    //   //     if(min === 30 ){

    //   //       return setHours(setMinutes(date, min + 30 ), hours + 1  );

    //   //     }

    //   //     return setHours(setMinutes(date, min + 30 ), hours  );

    //   //  }




    //   //   return  setHours(setMinutes(date, min ), hours);

    //   }
    //     // debugger
    //     // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

    //   // return  new Date( b.start_time)

    // });


     let between_hours = [];
    between_hours =  this.props.busy.map( b => {
       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
        if( select_day === today.getDate()) {


        let duration_hour = new Date(b.duration).getHours();
        let duration_minute = new Date(b.duration).getMinutes();

        let date = today;

       let hours = today.getHours();
       let min = today.getMinutes();
        let sisi = {};
      if(min > 0 && duration_hour === 1){
           // debugger
          sisi = setHours(setMinutes(new Date(b.start_time), + 0 ), + duration_hour);
        }




        // var i;
        // for (i = 0; i < duration_hour; i++) {
        //   let  hour_tab = setHours(setMinutes(date, + 0 ), hours + duration_hour );

        //   return hour_tab;
        // }


       // if(duration_hour === 1){
       //  return setMinutes(date, min + 30 );
       // }
       // if(duration_hour === 2){
       //  var i;
       //  for (i = 0; i < duration_hour; i++) {
       //    return setHours(setMinutes(date, min + 30 ), hours + 1 );
       //  }

      // }

        // switch( duration) {

        //   case duration_min === 30:
        //     return  setHours(setMinutes(date, min + duration_min), hours );
        //   case duration_hour === 1:
        //     return setHours(setMinutes(date, min ), hours + duration_hour);
        //   case duration_hour === 1 && duration_min === 30:
        //     return setHours(setMinutes(date, min + duration_min  ), hours + duration_hour);
        // default:
        //     return state;
        // }

       // switch(b.duration > ) {

       //  case :

       //    return ;

       //  default:
       //      return state;
       //  }







        // return  setHours(setMinutes(date, min + duration_min), hours + duration_hour);
      }
        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });

    let  between_minutes = [];
    between_minutes =  this.props.busy.map( b => {
       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
        if( select_day === today.getDate()) {


        let duration_hour = new Date(b.duration).getHours();
        let duration_minute = new Date(b.duration).getMinutes();

        let date = today;

       let hours = today.getHours();
       let min = today.getMinutes();

        let sisi = {};

        if( min > 0) {
           sisi = setHours(setMinutes(new Date(b.start_time), 0 ), + 1);
        }else if (min == 0) {
           sisi = setHours(setMinutes(new Date(b.start_time), 30 ), hours);
           // debugger
        }else if( min > 0 && duration_hour === 1){
          sisi = setHours(setMinutes(new Date(b.start_time), 0 ), + duration_hour);
           // debugger
        }


        return sisi;

        // var i;
        // for (i = 0; i < duration_hour; i++) {
        //   if (duration_minute > 0){





          // return min_tab;
          }




       // if(duration_hour === 1){
       //  return setMinutes(date, min + 30 );
       // }
       // if(duration_hour === 2){
       //  var i;
       //  for (i = 0; i < duration_hour; i++) {
       //    return setHours(setMinutes(date, min + 30 ), hours + 1 );
       //  }

      // }

        // switch( duration) {

        //   case duration_min === 30:
        //     return  setHours(setMinutes(date, min + duration_min), hours );
        //   case duration_hour === 1:
        //     return setHours(setMinutes(date, min ), hours + duration_hour);
        //   case duration_hour === 1 && duration_min === 30:
        //     return setHours(setMinutes(date, min + duration_min  ), hours + duration_hour);
        // default:
        //     return state;
        // }

       // switch(b.duration > ) {

       //  case :

       //    return ;

       //  default:
       //      return state;
       //  }







        // return  setHours(setMinutes(date, min + duration_min), hours + duration_hour);

        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });

    let busy_min = [];
    busy_min =  this.props.busy.map( b => {
       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
        if( select_day === today.getDate()) {


        let duration_hour = new Date(b.duration).getHours();
        let duration_minute = new Date(b.duration).getMinutes();

        let date = today;

       let hours = today.getHours();
       let min = today.getMinutes();


      if( duration_minute > 0  && min === 0 || min > 1) {
        let  min_tab = setMinutes(date, min + 30 );
        return min_tab;
      }
      if( duration_hour === 1  && min === 0 ) {
        let  min_tab = setMinutes(date, min + 30 );
        return min_tab;
      }
      if( duration_hour === 1  && duration_minute > 0 && min === 0) {

        let  min_tab = setMinutes(date, min + 30 );
        let  min_tab_2 = setMinutes(date, min + 30 );
        return [[min_tab], [min_tab_2]];
      }
      if( duration_hour === 1  && duration_minute > 0 && min > 0) {
        let  min_tab = setMinutes(date, min + 30 );
        return min_tab;
      }

      if( duration_hour === 2 ) {

        let min_tab = setMinutes(date, min + 30 );
        let min_tab_2 = setMinutes(date, min + 30 );

        return min_tab_2;
      }
      //  if( duration_hour === 1 && duration_minute > 0 && min === 0  ) {
      //   debugger
      //   let  min_tab = setMinutes(date, min + 30 );
      //   let  min_tab_2 = setMinutes(date, min + 30 );
      //   return [[min_tab], [min_tab_2]];
      // }




        // const abac = {
        //   1: 2,
        //   30: 1,
        //   31: 3,
        //   2: 4,
        //   32: 5
        // };

        // const  number_duration = duration_hour + duration_minute;
        // let newDateObj = [];
        // var i;
        // for (i = 0; i < abac[number_duration]; i++) {
        //    newDateObj.push(moment(new Date(date)).add( 30, 'm').toDate())
        // }

        // 30 min +30
        //
        // 1 hour + 30 + 30



       // return newDateObj;





      // if( duration_hour === 0 && duration_minute > 1 && min === 0 ){
      //   let  min_tab = setHours(setMinutes(date, min + duration_minute ), hours);
      //   return min_tab;
      //   // var i;
      //   // for (i = 0; i < duration_hour; i++) {
      //   //   let  min_tab = setHours(setMinutes(date, min + 30 ), hours   );

      //   //   // debugger
      //   //   // let  hour_tab = setHours(setMinutes(date, duration_minute ), hours + 1 );

      //   //   return min_tab;
      //   // }
      // }

      // if( duration_hour === 0 && duration_minute > 1 && min >= 30){
      //   let  min_tab = setHours(setMinutes(date, min + duration_minute ), hours);
      //   return min_tab;
      // }

      // if( duration_hour >= 1 && duration_minute == 0 ){




      //     let  min_tab = setHours(setMinutes(date, min + 30 ), hours );
      //     let  hour_tab = setHours(setMinutes(date, min ), hours + duration_hour);
      //     debugger
      //     return [min_tab, hour_tab];


      // }


        // if(duration_hour === 0 && duration_minute > 1 && min === 0 ){

        //   var i;
        //   for (i = 0; i < duration_hour; i++) {
        //     let  min_tab = setHours(setMinutes(date, min + duration_minute ), hours  );
        //     // let  hour_tab = setHours(setMinutes(date, 0 ), hours + duration_hour );

        //     return min_tab;
        //   }
        // }


       // if(duration_hour === 1){
       //  return setMinutes(date, min + 30 );
       // }
       // if(duration_hour === 2){
       //  var i;
       //  for (i = 0; i < duration_hour; i++) {
       //    return setHours(setMinutes(date, min + 30 ), hours + 1 );
       //  }

      // }

        // switch( duration) {

        //   case duration_min === 30:
        //     return  setHours(setMinutes(date, min + duration_min), hours );
        //   case duration_hour === 1:
        //     return setHours(setMinutes(date, min ), hours + duration_hour);
        //   case duration_hour === 1 && duration_min === 30:
        //     return setHours(setMinutes(date, min + duration_min  ), hours + duration_hour);
        // default:
        //     return state;
        // }

       // switch(b.duration > ) {

       //  case :

       //    return ;

       //  default:
       //      return state;
       //  }







        // return  setHours(setMinutes(date, min + duration_min), hours + duration_hour);
      }
        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });

let busy_hour = [];
    busy_hour =  this.props.busy.map( b => {
       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
      if( select_day === today.getDate()) {


        let duration_hour = new Date(b.duration).getHours();
        let duration_minute = new Date(b.duration).getMinutes();

        let date = today;

       let hours = today.getHours();
       let min = today.getMinutes();




        if( duration_hour === 1 && duration_minute > 0  && min === 0 ) {

          let  hour_tab = setHours(date, hours + 1);

          return hour_tab;
        }
        if( duration_hour === 1 && duration_minute > 0  && min > 0 ) {

          let  hour_tab = setHours(date, hours + 1);

          return hour_tab;
        }
        if( duration_hour === 2 && duration_minute === 0  && min == 0 ) {

          let  hour_tab = setHours(setMinutes(date, min + 30  ), hours + 1 );


          return hour_tab;
        }
      //  if( duration_hour === 1 && duration_minute > 0 && min === 0  ) {
      //   debugger
      //   let  min_tab = setMinutes(date, min + 30 );
      //   let  min_tab_2 = setMinutes(date, min + 30 );
      //   return [[min_tab], [min_tab_2]];
      // }
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
        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });
        let test = [];
    test =  this.props.busy.map( b => {
       let today = new Date(b.start_time);
       let select_day = new Date(this.state.startDate).getDate();
        if( select_day === today.getDate()) {
       let date = today

       let hours = today.getHours();
       let min = today.getMinutes();


        let duration_hour = new Date(b.duration).getHours();
        let duration_minute = new Date(b.duration).getMinutes();

      let busy_time = [];

      const hour_concat = duration_hour.toString();
      const min_concat = duration_minute.toString();

      const duration_time = hour_concat + min_concat;
      const duration_time_interger = parseInt(duration_time);

      const abac = {
        30: 1,
        10: 2,
       130: 3
      }

      const start_busy_time = b.start_time;

      if(abac[duration_time_interger] === 1){
        moment(start_busy_time).add( 30, 'm').toDate();
      }
      if( abac[duration_time_interger] === 2){
        busy_time.push(moment(start_busy_time).add( 30, 'm').toDate());
        // busy_time.push(moment(start_busy_time).add( 1, 'h').toDate());

        let minute_set = busy_time[0].getMinutes();
        let hour_set = busy_time[0].getHours();

        return new Date(start_busy_time).setMinutes(minute_set);
      }
      if(abac[duration_time_interger] === 3){
        busy_time.push(moment(start_busy_time).add( 30, 'm').toDate());
        busy_time.push(moment(start_busy_time).add( 1, 'h').toDate());

        let minute_set = busy_time[0].getMinutes();
        let hour_set = busy_time[1].getHours();



        return new Date(start_busy_time).setMinutes(minute_set), new Date(start_busy_time).setHours(hour_set) ;

      }

      // let minut = 0;
      // var i;
      // for (i = 0; i < abac[duration_time_interger]; i++) {


      //     busy_time.push( moment(b.start_time).add( 30, 'm').toDate() );
      // }






      }
        // debugger
        // return [setHours(setMinutes(new Date(), 0), 17), setHours(setMinutes(new Date(), 30), 18), setHours(setMinutes(new Date(), 30), 19), setHours(setMinutes(new Date(), 30), 17)]

      // return  new Date( b.start_time)

    });

      // debugger
    test
debugger
      return [ ...res, ...res_2, ...test ];




  }




  render() {
    // console.log("my props",this.props.formError.errors);
    //
    // if(this.state.modal === 'modal'){
    //   return(
    //     <button  className="btn btn-primary" data-dismiss="modal" type="submit"
    //       >
    //           great  success
    //       </button>
    //     );
    // }

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
                onChange={this.handleChange}
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
