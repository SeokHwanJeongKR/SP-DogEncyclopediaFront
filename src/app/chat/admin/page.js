import ChatComponent from "@/components/AdminChat";
import AdminChat from "@/components/AdminChat";
import {Suspense} from "react";

export default function adminChat() {


    return (
      <div>
          <Suspense fallback={<p>Loading admin chat...</p>}>
              <AdminChat />
          </Suspense>
      </div>

    );
}