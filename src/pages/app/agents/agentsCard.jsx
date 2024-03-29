import React from 'react';
import Card from "@/components/ui/Card";
import Image from "@/components/ui/Image";
import responsiveImage4 from "@/assets/images/all-img/thumb-4.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Tooltip from "@/components/ui/Tooltip";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAgent } from "./agentsStore"

export const AgentCard = ({agentID, name, email, contact, role, gender, profile }) => {
const dispatch = useDispatch();
const { agent } = useSelector((state) => state.auth);
// handle agent deleting
const handleAgentDel = (agentID) => {
  if (agent.userType == "admin") {

    dispatch(deleteAgent(agentID))

    toast.success("Agent successfully deleted!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("Not authorized to perform action", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
  return (
    <div className="lg:col-span-10 col-span-12">
        <Card className="mt-4">

          <div className="row">
            <div className="col-2">
              <Image src={'http://localhost:3000/uploads/'+profile}  className="rounded border-slate-300 " />
            </div>

            <div className="col-9">
              <div className="pb-6 d-flex flex-row justify-content-between">

                <div>
                  <p>Name: {name}</p>
                  <p>Agent ID: {agentID.slice(0, 10)}</p>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <Tooltip content="Delete agent" placement="top" arrow animation="shift-away" theme="danger">
                        <button className="action-btn" type="button" onClick={() => handleAgentDel(agentID)}>
                          <Icon icon="heroicons:trash" />
                        </button>
                      </Tooltip>
                  </div>
                  <div className='col-6'>
                    <Link to={`/agents-details/${agentID}`}>
                      <Tooltip content="View" placement="top" arrow animation="shift-away">
                        <button className="action-btn" type="button">
                          <Icon icon="heroicons:eye" />
                        </button>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              </div>
{/* </div> */}
              <div className="row text-sm">
                <div className="col-4">

                  <div className="d-flex flex-row ">
                    <div className="pt-1 inline">
                      Gender: <span className="text-sm font-bold text-info-500" >{gender}</span>
                     </div>
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1">Role: <span className=' text-sm font-bold text-primary-600'>{role}</span></div>
                  </div>
                </div>

                <div className="col-8">

                  <div className="d-flex flex-row ">
                    <div className="pt-1 pb-2"><Icon icon="ic:outline-email" /></div>
                    <div className="pl-2">{email}</div>
                  </div>

                  <div className="d-flex flex-row ">
                    <div className="pt-1"><Icon icon={"solar:phone-bold"} /></div>
                    <div className="pl-2"><p>{contact}</p></div>
                  </div>
                </div>


              </div>

            </div>
          </div>
        </Card>
    </div>
  )
}

// export default AgentCard;