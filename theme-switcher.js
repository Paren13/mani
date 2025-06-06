document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы переключателя темы
    const toggleSwitch = document.getElementById('theme-checkbox');
    const currentThemeText = document.querySelector('.current-theme-text');
    const themeStylesheet = document.querySelector('link[data-theme]');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Функция для обновления темы
    function updateTheme(theme) {
        // Обновляем класс на html элементе
        document.documentElement.setAttribute('data-theme', theme);
        
        // Обновляем состояние чекбокса
        if (toggleSwitch) {
            toggleSwitch.checked = theme === 'dark';
        }
        
        // Обновляем текст
        if (currentThemeText) {
            currentThemeText.textContent = theme === 'dark' ? 'Тёмная' : 'Светлая';
        }
        
        // Обновляем стили
        if (themeStylesheet) {
            const currentPath = themeStylesheet.getAttribute('href');
            const newPath = currentPath.replace(
                theme === 'light' ? 'dark-theme.css' : 'light-theme.css',
                theme === 'light' ? 'light-theme.css' : 'dark-theme.css'
            );
            themeStylesheet.setAttribute('href', newPath);
        }
        
        // Сохраняем выбор в localStorage
        localStorage.setItem('theme', theme);
        
        // Добавляем класс для анимации
        document.body.classList.add('theme-transition');
        
        // Удаляем класс анимации после завершения
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);

        // Отправляем событие об изменении темы
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    // Устанавливаем начальную тему
    updateTheme(savedTheme);
    
    // Обработчик переключения
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            const newTheme = e.target.checked ? 'dark' : 'light';
            updateTheme(newTheme);
        });
    }
});