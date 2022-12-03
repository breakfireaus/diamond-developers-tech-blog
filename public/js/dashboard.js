const addButtonHandlers = async (event) => {
    document.location.replace('dashboard/newArticle');
  };
  
  const updateButtonHandlers = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      document.location.replace(`/dashboard/updateArticle/${id}`);
    } else {
      alert('Update button has no data-id');
    }
  };
  
  const deleteButtonHandlers = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Fail to delete article');
      }
    } else {
      alert('Delete button has no data-id');
    }
  };
  
  document
    .querySelector('#btn-add')
    .addEventListener('click', addButtonHandlers);
  
  document
    .querySelectorAll('.btn-update')
    .forEach(btn => btn.addEventListener('click', updateButtonHandlers));
  
  document
    .querySelectorAll('.btn-delete')
    .forEach(btn => btn.addEventListener('click', deleteButtonHandlers));