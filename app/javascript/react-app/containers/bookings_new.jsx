import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createBooking } from '../actions';



class BookingsNew extends Component {

  onSubmit = (values) => {
    console.log(values);
    const { id } = this.props.match.params;
    this.props.createBooking( id, values );
  }
  renderError = ({error, touched}) => {
    if(touched && error){
      return <div>{error}</div>
    }
  }

  renderField = (field) => {
    console.log(field);
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




  render() {
    console.log("my props",this.props);

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              label="date"
              name="start_time"
              type="datetime-local"
              component={this.renderField}
            />

            <Field
              label="date end"
              name="end_time"
              type="datetime-local"
              component={this.renderField}
            />


            <Field
              label="time"
              name="duration"
              type="time"
              component={this.renderField}

          />

            <button className="btn btn-primary" type="submit"
          disabled={this.props.pristine || this.props.submitting}>
              Create Booking
            </button>
        </form>
        { this.props.formError.map( er => {
          return er
        }) }

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
    return { formError: state.errors }
}

export default reduxForm({ form: 'newBookingForm',validate , initialValues: { user_id: 1, profile_id: 1 } })(
  connect(null, { createBooking })(BookingsNew)
);
