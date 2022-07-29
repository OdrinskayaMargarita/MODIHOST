import styleSelect from '../libs/style-select';
import Form from './../components/Form';

export default () => {
  styleSelect('.select-menu');

  let contactForm = new Form({
      $form: document.getElementById('contact-form'),
      resetSuccess: true
  });
  contactForm.init();
}
