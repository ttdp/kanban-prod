import Board from "./Board";

export default function RightPane() {
    return (
        <div className="basis-5/6">
            <Board />
            {/* <div className="bg-emerald-200 h-80 grid place-content-center">
                <div className="bg-emerald-400 h-48 w-48 shadow-2xl rounded-full grid place-content-center">
                    <div className="bg-emerald-600 h-24 w-24 shadow-2xl rounded-full grid place-content-center">
                    </div>
                </div>
                <div className="flex mx-6">
                    <section className=" mx-auto p-4 flex justify-between items-center font-bold text-3xl">Hello</section>
                </div>
            </div> */}
        </div>
    )
}
