const Notification = ({showNotification}) => {
    return ( 
        <>
          {showNotification &&
            <div className="notification-container">
              <p>You have already entered this letter</p>
            </div>
          }
        </>
     );
}
 
export default Notification;