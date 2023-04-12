// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { Box, Button, useToast } from "@chakra-ui/react";

import ExploreCreatorsSearchResults from "../../../components/explorecreators/sections/SearchResults";
import SEO from "../../../components/SEO";

import { UserContext } from "../../../utils/context";

// ALGOLIA IMPORTS

import { creatorsIndex } from "../../../utils/algolia";

const ExploreCreatorsResults = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user && router.query.id) {
          const list = [];
          const { hits } = await creatorsIndex.search(router.query.id);
          hits.forEach((hit) => {
            if (hit.objectID !== user.uid) {
              list.push(hit);
            }
          });
          setUsers(list);
        }
      } catch (e) {
        showToast();
      }
    };
    fetchUsers();
  }, [user, router.query.id]);

  return (
    <>
      <SEO
        title={`Search ${router.query && router.query.id} - Prodicity`}
        description={""}
        keywords={""}
        image={""}
      />
      <Box
        w={"100%"}
        h={"100%"}
        overflowX={"hidden"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "10px",
          },
        }}
      >
        <ExploreCreatorsSearchResults users={users} search={router.query.id} />
      </Box>
    </>
  );
};

export default ExploreCreatorsResults;
