import { Outlet } from "react-router-dom";
import { SupportHeaderContainer } from "../../components";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import FooterComponent from "../../components/layout/support/FooterComponent";
import LoadingContext, { LoadingProvider } from "../../components/LoadingContext";
import { useState } from "react";

const SupportOutlet = () => {
  const [isMessageLoadingOpen, setIsMessageLoadingOpen] = useState(false);
  const [zIndex, setIndex] = useState(100);

  return (
    <LoadingProvider>
      <Layout className={`${isMessageLoadingOpen ? 
                'loading--message-background' : 'layout--background' 
            }`}>
        <SupportHeaderContainer zIndex={zIndex}/>
        <br /><br /><br />
        {/* <Content> */}
        <Content style={{ zIndex: `${zIndex}`, position:'relative' }}>
          <Outlet context={{ setIsMessageLoadingOpen, setIndex }}/>
        </Content>
        <FooterComponent />
      </Layout>
    </LoadingProvider>
  );
};
export default SupportOutlet;
