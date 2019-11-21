/**
 * Customer Controller
 */
import { Component } from 'react';
import ServiceRepo from '../repositories/Service.js'

class CustomerController extends Component {
  getServices(){
    try {
      return ServiceRepo.getServices();
    } catch (error) {
      console.error("Error en el controlador de servicios.");
      
    }
  }

  getServiceById(id_service){
    try {
      return ServiceRepo.getServiceById(id_service);
    } catch (error) {
      console.error("Error en el controlador de servicios.");
    }
  }
}

export default new CustomerController();