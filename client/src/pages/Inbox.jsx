import AdminInbox from "../components/AdminInbox";
import InnerBanner from "../components/InnerBanner";

import React from 'react'

const Inbox = () => {
  return (
    <div>
      {/* <InnerBanner title="Inbox" breadcrumb={[{ title: "Home", url: "/" }, { title: "Inbox" }]} /> */}
      <AdminInbox />
    </div>
  )
}

export default Inbox
