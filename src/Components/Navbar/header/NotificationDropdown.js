import { cilBell } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

const NotificationDropdown = ({ notifications }) => {
  console.log("ondropdown",notifications);
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 fs-5 pe-0" caret={false}>
        <CIcon icon={cilBell} size="xl" style={{color: 'black'}}  />
        {notifications?.length > 0 && (
          <CBadge
            color="danger"
            shape="pill"
            className=" position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '10px' }}
          >
            {notifications?.length}
          </CBadge>
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-2" placement="bottom-end" style={{ width: '400px' }}>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <CDropdownItem key={index} style={{ fontSize: '12px', width:"100", textAlign:"center" }}>
              {notifications[index]}
            </CDropdownItem>
          ))
        ) : (
          <CDropdownItem style={{ fontSize: '12px', textAlign:"center" }}>
            No Notifications
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default NotificationDropdown