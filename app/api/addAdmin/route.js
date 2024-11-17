import adminTable from '../../../AdminModel'
import {  NextResponse } from 'next/server';
import { connecting } from '@/dataConfig.js';
import { sendMail } from '@/mailer';
// import { redirect } from 'next/navigation';


export async function POST(request) {
    connecting()
    try {
        const { name, email } = await request.json();
        // console.log(name)

        // Check if user already exists
        const existingUser = await adminTable.findOne({ email });
       
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const r= await sendMail({email,name});
        if(r){
            console.log(r)
        
        }
        else{
            console.log('no response')
        }
      
      
    return NextResponse.json({ message: "send mail",
                                 success:true,
                                 r
     }, { status: 201 });

  }



  

        
      
    
     catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

