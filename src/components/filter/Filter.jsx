import PropTypes from 'prop-types';

const Filter = ({ handleChangeFilterField }) => (
  <>
    <h2>Find contacts by name</h2>
    <input type="text" name="filter" onChange={handleChangeFilterField}></input>
  </>
);

Filter.propTypes = {
  handleChangeFilterField: PropTypes.func.isRequired,
};

export default Filter;
