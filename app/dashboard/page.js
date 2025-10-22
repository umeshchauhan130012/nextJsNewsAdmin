import Infocard from "./components/infocard";

export default function DashboardPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-full px-[15px]">
          <div className="flex flex-wrap -mx-[10px]">
              <div className="flex-none w-full p-[7px_10px]">
                  <div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                      <h4 className="font-bold leading-[1.2] mb-0 text-[20px]">Site Reports</h4>
                  </div>
              </div>
          </div>  
          <div className="flex flex-wrap -mx-[10px]">
              <div className="flex-none w-1/4 p-[7px_10px]">
                  <Infocard title="All Products" cardType="Product"/>
              </div>
              <div className="flex-none w-1/4 p-[7px_10px]">
                  <Infocard />
              </div>
              <div className="flex-none w-1/4 p-[7px_10px]">
                  <Infocard title="All Categories" cardType="Category" />
              </div>
              <div className="flex-none w-1/4 p-[7px_10px]">
                  <Infocard title="All Tags" cardType="Tags" />
              </div>
          </div> 
      </div>
      <div className="mx-auto w-full max-w-full px-[15px]">
          <div className="flex flex-wrap -mx-[10px]">
              <div className="flex-none w-3/4 p-[7px_10px]">
                  <div className="flex flex-wrap -mx-[10px]"> 
                      <div className="flex-none w-1/2 p-[7px_10px]">
                          <div className="bg-white rounded-[10px] shadow-[0_0_50px_#00000008] p-4">
                              <div id="revenu-chart"></div>
                          </div>
                      </div>
                      <div className="flex-none w-1/2 p-[7px_10px]">
                          <div className="bg-white rounded-[10px] shadow-[0_0_50px_#00000008] p-4">
                              <div id="chart"></div>
                          </div>
                      </div>
                  </div>  
              </div>
              <div className="flex-none w-1/4 p-[7px_10px]">
                  <div className="flex flex-wrap -mx-[10px]">
                      <div className="flex-none w-full p-[7px_10px]">
                          <div className="flex flex-wrap items-center justify-between bg-white border-l-4 border-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] py-3 px-4">
                              <h4 className="font-bold text-[20px] leading-[1.2] mb-0 text-[#333333]">Social Media Reports</h4>
                          </div>
                      </div>
                  </div>
                  <div className="flex flex-wrap -mx-[10px]">
                      
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
