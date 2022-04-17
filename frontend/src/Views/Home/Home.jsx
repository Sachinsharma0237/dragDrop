import React, { useState } from "react";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import Logout from "../../components/DragAndDrop/Logout";
function Home() {

    return (
      <div>
        <Logout/>
        <DragAndDrop/>
      </div>
    )
}

export default Home;