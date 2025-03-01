import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Collection from "@/lib/models/Collection";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
    try {

        const {userId} = auth()
        if(!userId){
            return new NextResponse('Unauthorized',{status:403})
        }

        console.log('route reached')

        await connectToDB()

        console.log('route escaped')

        const {title, description, image} = await req.json();
        const existingCollection = await Collection.findOne({title})

        if(existingCollection){
            return new NextResponse('Collection already existed', {status:400})
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 })
          }
      
          const newCollection = await Collection.create({
            title,
            description,
            image,
          })
      
          await newCollection.save()
      
          return NextResponse.json(newCollection, { status: 200 })
       // console.log('server side triggered')
        
    } catch (error) {
        console.log("[collection_POST]",error)
        return new NextResponse('Internalssss server Error',{status:500})
    }
}


export const GET  = async(req:NextRequest)=>{
    try {

        await connectToDB();

        const collections = await Collection.find().sort({createdAt:'desc'});

        return NextResponse.json(collections,{status:200})
        
    } catch (error) {
        console.log('[collections_GET]',error);
        return new NextResponse('Internal Server Error',{status:500})
    }
}