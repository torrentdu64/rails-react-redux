import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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


      return [ ...res, ...res_2 ];




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
