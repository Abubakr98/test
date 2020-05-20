import Head from "next/head";
import { siteTitle } from "../components/layout";
import Layout from "../components/layoutHome";
import Card from "../components/card";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Posts } from '../interfaces/index' //Func
import axios from "axios";
import API from '../APIurl';
// import { connect } from 'react-redux';
// import { iRootState, Dispatch } from '../store'

function Home({
  posts,
  // storePosts,
  // setPosts
}: {
  posts: Posts[];
  // storePosts: Posts[];
  // setPosts: Func;
}) {
  // setPosts(posts);
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Section>
        <Cards>
          {
            posts ? ( //storePosts
              posts.map((el) => ( //storePosts
                <Card key={el.id} post={el}></Card>
              ))
            ) : ('loading...')
          }
        </Cards>
      </Section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(API.base + API.posts);
  const posts = await res.data;
  return { props: { posts } };
};
const Cards = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Section = styled.section`
  font-size: 1.2rem;
  line-height: 1.5;
  padding-top: 20px;
`;

// const mapState = (state: iRootState) => ({
//   storePosts: state.posts
// })

// const mapDispatch = (dispatch: Dispatch) => ({
//   setPosts: (data: Posts[]) => dispatch.posts.setPosts(data)
// })
export default Home
// export default connect(mapState, mapDispatch)(Home);