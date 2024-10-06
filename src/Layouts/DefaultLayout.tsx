const DefaultLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <section >
            <div
                className="h-fit px-4 max-w-[1200px] mx-auto"
            >
                <div className="w-full h-20 bg-red-500">

                </div>
                {children}
            </div>
        </section>
    );
};

export default DefaultLayout;
