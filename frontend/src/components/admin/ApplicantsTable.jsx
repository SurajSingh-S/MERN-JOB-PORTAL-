import { Table, TableBody, TableCell } from '../ui/table'
import React from 'react'
import { TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { Popover, PopoverContent } from '../ui/popover';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {

  const { applicants } = useSelector(store => store.application);


  const statusupdate=async(status,id)=>{
    try{
      axios.defaults.withCredentials=true;
      const res= await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
      })

      if (res.data.success){
        toast.success(res.data.message)
      }
    }
    catch(error){
      toast.error(error.response.data.message);
    }

  }
  return (
    <div>
      <Table>
        <TableCaption>A list of recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={`text-right`}>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell> {
                  item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                 
                }</TableCell>

                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell className={`text-right cursor-pointer`}>
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {
                        shortListingStatus.map((status, index) => {
                          return (
                            <div onClick={()=> statusupdate(status,item?._id)} 
                            key={index}
                            className='cursor-pointer'>
                              <span>{status}</span>
                            </div>
                          )
                        })
                      }
                    </PopoverContent>
                  </Popover>

                </TableCell>


              </tr>
            ))
          }

        </TableBody>


      </Table>
    </div>
  )
}

export default ApplicantsTable
