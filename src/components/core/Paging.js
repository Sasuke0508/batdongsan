import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function Paging({ first, last, previous, next, pages, pageNumber, goToPage }) {

    return (
        <div className="list__pagination mt-3">
            <Pagination>
                <PaginationItem onClick={first}>
                    <PaginationLink first />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous onClick={previous} />
                </PaginationItem>

                {
                    pages.map(page => (
                        <PaginationItem key={page} active={page === pageNumber } onClick={() => goToPage(page)}>
                            <PaginationLink>{ page }</PaginationLink>
                        </PaginationItem>
                    ))
                }
                
                <PaginationItem>
                    <PaginationLink next onClick={next}/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last onClick={last}/>
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default Paging;