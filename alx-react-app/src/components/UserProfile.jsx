const UserProfile = (props) => {
  return (
    <div 
      style={{
        border: '1px solid gray',
        padding: '15px',
        margin: '15px',
        borderRadius: '5px'
      }}
      >
      <h2 style={{ color: 'blue', marginBottom: '10px' }}>
        {props.name}
      </h2>
      
      <p>
        Age:{' '}
        <span style={{ fontWeight: 'bold', color: 'green' }}>
          {props.age}
        </span>
      </p>

      <p style={{ marginTop: '8px' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;