import Div from "./division";

export default function Footer() {
  return (
    <footer className="pl-[70px] transition-all duration-100 ease-out">
        <Div className="bg-white shadow-[0_0_20px_#59667a1a] tracking-[0.7px] p-[13px_20px]">
            <Div className="mx-auto max-w-full px-[15px] w-full">
                <Div className="flex flex-wrap -mx-[10px]">
                    <Div className="flex-none w-1/2 p-[7px_10px]">
                        <p className="!mb-0">CMS © 2023 Umesh CMS. All rights reserved.</p>
                    </Div>
                    <Div className="flex-none w-1/2 p-[7px_10px] text-right">
                        <p className="!mb-0">Umesh CMS Admin System</p>
                    </Div>
                </Div>
            </Div>
        </Div>
    </footer>
  );
}
