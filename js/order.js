function renderModal(id) {

    if(document.getElementById(`modal-order-${id}`))
        return null;

    const modal = document.createElement('div');
    modal.classList = 'modal fade';
    modal.id = `modal-order-${id}`;
    modal.tabIndex = '-1';
    modal.role = 'dialog';
    modal.setAttribute('aria-hidden','true');
    modal.setAttribute('aria-labelledby',`modal-order-${id}-title`)
    modal.innerHTML += renderHTMLOrder();

    return modal;
}

function renderHTMLOrder() {
    return `<div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="content-wrapper">
                            <div class="container">
                                <div class="row d-flex justify-content-center align-items-center">
                                    <div class="col-lg-8 col-xl-6">
                                        <div class="card border-top border-bottom border-3">
                                            <div class="card-body p-5">
                            
                                                <p class="lead fw-bold mb-5 title">Detalhes da Encomenda</p>
                            
                                                <div class="row">
                                                    <div class="col mb-3">
                                                        <p class="small text-muted mb-1">Data</p>
                                                        <p>4 Abril 2023</p>
                                                    </div>
                                                    
                                                    <div class="col mb-3">
                                                        <p class="small text-muted mb-1">Número de encomenda</p>
                                                        <p>xxxxxxx</p>
                                                    </div>
                                                </div>
                            
                                                <div class="mx-n5 px-5 py-4">
                                                    <div class="row">
                                                        <div class="col-md-8 col-lg-9">
                                                            <p>Garrafão de 5L</p>
                                                        </div>
                                                        <div class="col-md-4 col-lg-3">
                                                            <p>19.99$</p>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-8 col-lg-9">
                                                            <p class="mb-0">Envio</p>
                                                        </div>

                                                        <div class="col-md-4 col-lg-3">
                                                            <p class="mb-0">5.00$</p>
                                                        </div>
                                                    </div>
                                                </div>
                            
                                                <div class="row my-4">
                                                    <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                                                        <p class="lead fw-bold mb-0 total">24.99$</p>
                                                    </div>
                                                </div>
                            
                                                <p class="lead fw-bold mb-4 pb-2 title">Estado da Encomenda</p>
                            
                                                <div class="row">
                                                    <div class="col-lg-12">
                                    
                                                    <div class="horizontal-timeline">
                                    
                                                        <ul class="list-inline items d-flex justify-content-between">
                                                            <li class="list-inline-item items-list">
                                                                <p class="py-1 px-2 rounded done">Ordem Feita</p>
                                                            </li>
                                                            <li class="list-inline-item items-list">
                                                                <p class="py-1 px-2 rounded done">Em Processamento</p>
                                                            </li>
                                                            <li class="list-inline-item items-list">
                                                                <p class="py-1 px-2 rounded">Em Trânsito</p>
                                                            </li>
                                                            <li class="list-inline-item items-list">
                                                                <p class="py-1 px-2">Entregue</p>
                                                            </li>
                                                        </ul>
                                    
                                                    </div>
                                    
                                                    </div>
                                                </div>
                            
                                                <p class="mt-4 pt-2 mb-0">Precisa de ajuda? <a href="#!" class="help">Contacta-nos, por favor.</a></p>
                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

class Order {
    constructor(id) {
        this.id = id;
    }

    renderOrder() {
        const body = document.getElementsByTagName('body')[0];
        const modal = renderModal(this.id);
        if(modal)
            body.appendChild(modal);
    }

}

export {Order};