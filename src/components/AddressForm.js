import React from 'react';

function AddressForm({ address, onChange, onSubmit, editing, error }) {
  return (
    <form onSubmit={onSubmit} className="address-form">
      <input name="house" placeholder="House Name/Number" value={address.house} onChange={onChange} required />
      <input name="street" placeholder="Street" value={address.street} onChange={onChange} required />
      <input name="town" placeholder="Town" value={address.town} onChange={onChange} required />
      <input name="district" placeholder="District" value={address.district} onChange={onChange} required />
      <input name="state" placeholder="State" value={address.state} onChange={onChange} required />
      <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={onChange} required />
      <button type="submit">{editing ? "Update Address" : "Add Address"}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default AddressForm; 