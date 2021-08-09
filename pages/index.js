import Head from "next/head";
import Header from "../components/Header";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import Login from "../components/Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";
import { useRouter } from "next/router";

export default function Home() {
  const [session] = useSession();
  const router = useRouter();

  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  useEffect(() => {
    createDocument();
  }, [showModal]);

  const navigateToCreatedDoc = (createdDoc) =>
    router.push(`/doc/${createdDoc}`);

  async function createDocument() {
    if (!input) return;

    const createdDoc = await db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setInput("");
    setShowModal(false);
    navigateToCreatedDoc(createdDoc.id);
  }

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full px-4 py-1 transition border-2 rounded-full outline-none"
          placeholder="Enter document's name"
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        ></input>
      </ModalBody>

      <ModalFooter>
        <Button
          color="blue"
          className="mr-2"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button
          color="blue"
          className="mr-2"
          onClick={createDocument}
          ripple="light"
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {modal}

      <section className="bg-[#f8f9fa] pb-10 px-10 ">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="border-0 rounded-full"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div>
            <div
              onClick={() => setShowModal(true)}
              className="relative w-40 border-2 cursor-pointer h-52 hover:border-blue-700"
            >
              <Image
                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                layout="fill"
              />
            </div>

            <p className="mt-2 ml-2 text-sm font-semibold text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="px-10 bg-white md:px-0">
        <div className="max-w-3xl py-8 mx-auto text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="flex-grow font-medium">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
