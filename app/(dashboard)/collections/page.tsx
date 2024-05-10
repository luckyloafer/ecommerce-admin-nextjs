"use client";
import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Collections = () => {

  const router = useRouter();
  const [loadind, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("Collections_GET", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log(collections);

  return (
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Collections</p>
      <Button className="bg-blue-1 text-white" onClick={()=>router.push('/collections/new')}>
        <Plus className="h-4 w-4 mr-2"/>
        Create Collection
      </Button>
    </div>
    <Separator className="my-2 bg-grey-1"/>
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
