import { Component } from 'react';
import styles from './styles.module.css';

/**
 * 무인 전시에서 렌더 오류가 흰 화면으로 남지 않게 막는다. 오류를 잡으면
 * 안내를 띄우고, 관람객이 탭하면 처음부터 다시 시작한다.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
    this.restart = this.restart.bind(this);
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('Unhandled render error:', error, info?.componentStack);
  }

  restart() {
    window.location.reload();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className={styles.fallback} onClick={this.restart} role="alert">
        <p>
          잠시 문제가 생겼어요
          <span>화면을 탭하면 처음부터 다시 시작합니다</span>
        </p>
      </main>
    );
  }
}
