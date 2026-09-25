(function() {
  // Hotel Akriti Embeddable AI Chat Widget
  const WIDGET_HTML = `
    <style>
      #akriti-chat-trigger {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #c99e32 0%, #0f172a 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        z-index: 99999;
        transition: transform 0.2s ease;
      }
      #akriti-chat-trigger:hover {
        transform: scale(1.08);
      }
      #akriti-chat-frame-container {
        display: none;
        position: fixed;
        bottom: 95px;
        right: 25px;
        width: 420px;
        height: 620px;
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - 120px);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 99999;
        overflow: hidden;
        border: 1px solid #e2e8f0;
        background: #fff;
      }
      #akriti-chat-frame {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>

    <div id="akriti-chat-trigger" title="Hotel Akriti AI Booking Assistant">
      🤖
    </div>

    <div id="akriti-chat-frame-container">
      <iframe id="akriti-chat-frame" src="http://localhost:3000"></iframe>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', WIDGET_HTML);

  const trigger = document.getElementById('akriti-chat-trigger');
  const container = document.getElementById('akriti-chat-frame-container');
  let isOpen = false;

  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    container.style.display = isOpen ? 'block' : 'none';
    trigger.innerHTML = isOpen ? '✖' : '🤖';
  });
})();
