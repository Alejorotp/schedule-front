interface content{
    title: string;


}


function Card({ title}: content) {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4">
        <h1>
            {title}
        </h1>
        

      </div>
    </>
  );
}

export default Card;
